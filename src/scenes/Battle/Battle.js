class Battle {
    constructor(heroes, monsters) {
        this.heroes = heroes
        this.monsters = monsters
        this.result = {}
    }

    fight() {
        console.debug("Starting battle")
        console.debug("Heroes:", this.heroes)
        console.debug("Monsters:", this.monsters)

        while (this.heroesAreAlive() && this.monstersAreAlive()) {
            // hero attack
            this.heroes[0].attack(this.monsters[0])
            // monster attack
            this.monsters[0].attack(this.heroes[0])
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
}

export default Battle
