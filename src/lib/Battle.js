import ActivityLog from "./ActivityLog";

class Battle {
    static DEFAULT_CHARACTER_STATS = {
        damage: 0,
        kills: 0
    }
    constructor(heroes, monsters) {
        this.heroes = heroes
        this.monsters = monsters
        this.result = {}
        this.stats = {
            heroDamage: 0,
            heroesKilled: 0,
            monsterDamage: 0,
            monstersKilled: 0,
            byHero: {},
            byMonster: {}
        }
        this.logger = new ActivityLog()
        this.rewards = {gold: 0, xp: 0}

        heroes.forEach(hero => {
            this.stats.byHero[hero.uuid] = {...Battle.DEFAULT_CHARACTER_STATS}
        })

        monsters.forEach(monster => {
            this.stats.byMonster[monster.uuid] = {...Battle.DEFAULT_CHARACTER_STATS}
        })
    }

    fight() {
        this.logger.debug("Starting battle")
        this.logger.debug("Heroes:", this.heroes)
        this.logger.debug("Monsters:", this.monsters)

        while (this.heroesAreAlive() && this.monstersAreAlive()) {
            // TODO: should alternate attacks between party members, not always the first character
            const heroAttack = this.getFirstAliveHero().attack(this.getAttackTarget(this.monsters))
            let monsterAttack = null

            // check if monsters are still alive to attack back. A hero's attack can kill
            // a monster before it has the chance to retaliate
            if (this.monstersAreAlive()) {
                monsterAttack = this.getFirstAliveMonster().attack(this.getAttackTarget(this.heroes))
            }

            this.appendAttackStats(heroAttack, monsterAttack)
        }

        this.result = {
            heroesAreAlive: this.heroesAreAlive(),
            monstersAreAlive: this.monstersAreAlive(),
            status: this.heroesAreAlive() ? "victory" : "defeat"
        }

        this.logger.debug("Battle results:", this.result)
    }

    heroesAreAlive() {
        return this.heroes.some(hero => hero.isAlive())
    }

    monstersAreAlive() {
        return this.monsters.some(hero => hero.isAlive())
    }

    getAttackTarget(targets) {
        const aliveTargets = targets.filter(t => t.isAlive())

        if (aliveTargets.length > 0) {
            return aliveTargets[0]
        } else {
            // throw error?
        }
    }

    getFirstAliveHero() {
        return this.heroes.filter(hero => hero.isAlive())[0]
    }

    getFirstAliveMonster() {
        return this.monsters.filter(monster => monster.isAlive())[0]
    }

    appendAttackStats(heroAttack, monsterAttack = null) {
        this.stats.heroDamage += heroAttack.damage
        this.stats.byHero[heroAttack.attacker.uuid].damage += heroAttack.damage
        if (heroAttack.targetKilled) {
            this.stats.monstersKilled += 1
            this.stats.byHero[heroAttack.attacker.uuid].kills += 1
            this.addRewards(heroAttack.target.getRewards())
        }

        if (monsterAttack) {
            this.stats.monsterDamage += monsterAttack.damage
            this.stats.byMonster[monsterAttack.attacker.uuid].damage += monsterAttack.damage
            if (monsterAttack.targetKilled) {
                this.stats.heroesKilled += 1
                this.stats.byMonster[monsterAttack.attacker.uuid].kills += 1
            }
        }
    }

    addRewards(rewards = {}) {
        if (rewards.gold) {
            this.rewards.gold += rewards.gold
        }

        if (rewards.xp) {
            this.rewards.xp += rewards.xp
        }

        this.logger.debug("Battle rewards:", rewards)
    }

    setLogger(logger) {
        this.logger = logger
    }
}

export default Battle
