class Battle {
    constructor(heroes, monsters) {
        this.heroes = heroes
        this.monsters = monsters
        this.result = {}
        this.stats = {
            heroDamage: 0,
            heroesKilled: 0,
            monsterDamage: 0,
            monstersKilled: 0
        }
    }

    fight() {
        console.debug("Starting battle")
        console.debug("Heroes:", this.heroes)
        console.debug("Monsters:", this.monsters)

        while (this.heroesAreAlive() && this.monstersAreAlive()) {
            const heroAttackResults = this.heroes[0].attack(this.getAttackTarget(this.monsters))
            const monsterAttackResults = this.monsters[0].attack(this.getAttackTarget(this.heroes))
            this.appendAttackStats(heroAttackResults, monsterAttackResults)
        }

        this.result = {
            heroesAreAlive: this.heroesAreAlive(),
            monstersAreAlive: this.monstersAreAlive(),
            status: this.heroesAreAlive() ? "victory" : "defeat"
        }

        console.debug(this.result)
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

    appendAttackStats(heroAttackResults, monsterAttackResults) {
        this.stats.heroDamage += heroAttackResults.damage
        if (heroAttackResults.targetKilled) this.stats.monstersKilled += 1

        this.stats.monsterDamage += monsterAttackResults.damage
        if (monsterAttackResults.targetKilled) this.stats.heroesKilled += 1
    }
}

export default Battle
