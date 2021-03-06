import _ from 'lodash'
import { createNanoEvents } from 'nanoevents'

import ActivityLog from "./ActivityLog";

class Dungeon {
    static DEFAULT_CHARACTER_STATS = {
        damage: 0,
        kills: 0
    }
    static DEFAULT_REWARDS = {
        xp: 0,
        gold: 0
    }

    constructor(heroes, rooms) {
        this.rooms = rooms
        this.heroes = heroes
        this.monsters = _(this.rooms).map(r => r.monsters).flatten().value()
        this.results = {}
        this.stats = {
            heroDamage: 0,
            heroesKilled: 0,
            monsterDamage: 0,
            monstersKilled: 0,
            byHero: {},
            byMonster: {},
            byRoom: []
        }
        this.rewards = {...Dungeon.DEFAULT_REWARDS}

        this.heroes.forEach(hero => {
            this.stats.byHero[hero.uuid] = {...Dungeon.DEFAULT_CHARACTER_STATS}
        })

        this.monsters.forEach(monster => {
            this.stats.byMonster[monster.uuid] = {...Dungeon.DEFAULT_CHARACTER_STATS}
        })

        this.emitter = createNanoEvents()
        this.eventListeners = []
        this.initActivityLogger()
    }

    embark() {
        const clearedBattles = this.rooms.map((room) => {
            if (this.heroesAreAlive()) {
                return room.fightBattle(this.heroes)
            }
        }).filter(Boolean)

        this.collectRewardsFromBattle(clearedBattles)
        this.collectStatsFromBattles(clearedBattles)
        this.emitter.emit('end')
        this.teardown()
    }

    collectStatsFromBattles(battles) {
        const isVictorious = battles.every(b => b.result.status === "victory")

        this.results = {
            heroesAreAlive: isVictorious,
            monstersAreAlive: !isVictorious,
            status: isVictorious ? "victory" : "defeat"
        }

        battles.forEach(b => {
            this.stats.heroDamage += b.stats.heroDamage
            this.stats.heroesKilled += b.stats.heroesKilled
            this.stats.monsterDamage += b.stats.monsterDamage
            this.stats.monstersKilled += b.stats.monstersKilled

            _(b.stats.byHero).forEach((heroStats, heroUuid) => {
                this.stats.byHero[heroUuid].damage += heroStats.damage
                this.stats.byHero[heroUuid].kills += heroStats.kills
            })

            _(b.stats.byMonster).forEach((monsterStats, monsterUuid) => {
                this.stats.byMonster[monsterUuid].damage += monsterStats.damage
                this.stats.byMonster[monsterUuid].kills += monsterStats.kills
            })
        })
        this.stats.byRoom = battles.map(b => b.stats)

        this.logger.debug("Dungeon Stats:")
        this.logger.debug("\tBy Hero:", this.stats.byHero)
    }

    collectRewardsFromBattle(battle) {
        battle.forEach(battle => {
            this.rewards.xp += battle.rewards.xp
            this.rewards.gold += battle.rewards.gold
        })

        this.logger.debug("Dungeon Rewards:", this.rewards)
    }

    heroesAreAlive() {
        return this.heroes.some(h => h.isAlive())
    }

    getRewards() {
        return this.rewards ? this.rewards : {...Dungeon.DEFAULT_REWARDS}
    }

    initActivityLogger() {
        this.logger = new ActivityLog()
        this.heroes.forEach(h => h.setLogger(this.logger))
        this.monsters.forEach(m => m.setLogger(this.logger))
        this.rooms.forEach(r => r.setLogger(this.logger))
    }

    on(...args) {
        const listener = this.emitter.on(...args)
        this.eventListeners.push(listener)
    }

    teardown() {
        this.eventListeners.forEach(eventListener => {
            if (eventListener) {
                eventListener()
            }
        })
    }
}

export default Dungeon
