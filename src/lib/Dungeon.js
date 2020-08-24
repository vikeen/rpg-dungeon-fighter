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

        const battles = this.rooms.map((room) => room.fightBattle(this.heroes))
        this.collectStatsFromBattles(battles)
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
}

export default Dungeon
