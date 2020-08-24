import Hero from '../../lib/Hero'
import image from './sprites/mage.png'

class Mage extends Hero {
    constructor() {
        super()

        this.image = image
        this.name = "Mage"
        this.maxHp = 36
        this.currentHp = 36
        this.damage = 6
        this.armor = 0
    }
}

export default Mage
