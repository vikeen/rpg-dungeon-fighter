import Battle from "./Battle";

class Dungeon {
    constructor(monsters) {
        this.monsters = monsters
    }

    fightBattle(heroes) {
        const battle = new Battle(heroes, this.monsters)
        battle.fight()
        return battle
    }
}

export default Dungeon
