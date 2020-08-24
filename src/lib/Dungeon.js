import _ from 'lodash'

class Dungeon {
    static DEFAULT_CHARACTER_STATS = {
        damage: 0,
        kills: 0
    }

    constructor(rooms) {
        this.rooms = rooms
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
    }

    embark(heroes) {
        this.heroes = heroes
        this.monsters = _(this.rooms).map(r => r.monsters).flatten().value()

        this.heroes.forEach(hero => {
            this.stats.byHero[hero.uuid] = {...Dungeon.DEFAULT_CHARACTER_STATS}
        })

        this.monsters.forEach(monster => {
            this.stats.byMonster[monster.uuid] = {...Dungeon.DEFAULT_CHARACTER_STATS}
        })

        const clearedBattles = this.rooms.map((room) => {
            if (this.heroesAreAlive()) {
                return room.fightBattle(this.heroes)
            }
        }).filter(Boolean)

        this.collectStatsFromBattles(clearedBattles)
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
    }

    heroesAreAlive() {
        return this.heroes.some(h => h.isAlive())
    }
}

export default Dungeon
