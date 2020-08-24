import Hero from '../../lib/Hero'
import image from './sprites/knight.png'

class Knight extends Hero {
    constructor() {
        super()

        this.image = image
        this.name = "Knight"
        this.maxHp = 42
        this.currentHp = 42
        this.damage = 4
        this.armor = 2
    }
}

export default Knight
