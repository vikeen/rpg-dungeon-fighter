import Monster from '../../lib/Monster'
import image from './Goblin Elite.png'

class GoblinElite extends Monster {
    constructor() {
        super();

        this.name = "Goblin (Elite)"
        this.image = image
        this.maxHp = 18
        this.currentHp = 18
        this.damage = 8
        this.armor = 2
    }
}

export default GoblinElite
