class Dungeon {
    constructor(rooms) {
        this.rooms = rooms
        this.results = {}
        this.stats = {
            heroDamage: 0,
            heroesKilled: 0,
            monsterDamage: 0,
            monstersKilled: 0,
            byRoom: []
        }
    }

    embark(heroes) {
        this.heroes = heroes

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
        })
        this.stats.byRoom = battles.map(b => b.stats)
    }

    heroesAreAlive() {
        return this.heroes.every(h => h.isAlive())
    }
}

export default Dungeon
