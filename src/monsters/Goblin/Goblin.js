import Monster from '../../lib/Monster'
import image from './Goblin.png'

class Goblin extends Monster {
    constructor() {
        super();

        this.name = "Goblin"
        this.image = image
        this.maxHp = 6
        this.currentHp = 6
        this.damage = 4
        this.armor = 0
    }

    getRewards() {
        return {
            xp: 20,
            gold: 4
        }
    }
}

export default Goblin
