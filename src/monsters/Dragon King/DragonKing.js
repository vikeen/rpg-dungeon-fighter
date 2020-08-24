import Monster from '../../lib/Monster'
import image from './Dragon Dark King.png'

class DragonKing extends Monster {
    constructor() {
        super();

        this.name = "Dragon King"
        this.image = image
        this.maxHp = 1000
        this.currentHp = 1000
        this.damage = 100
        this.armor = 30
    }
}

export default DragonKing
