import {v4 as uuidv4} from 'uuid'
import ActivityLog from "./ActivityLog";

class BaseCharacter {
    constructor() {
        this.uuid = uuidv4()
        this.logger = new ActivityLog()
    }

    isAlive = () => {
        return this.currentHp > 0
    }

    attack = (target) => {
        this.logger.debug(`${this.name} attacks ${target.name} for ${this.damage} damage`)
        target.sufferAttack(this.damage)

        return {
            damage: this.damage,
            targetKilled: target.isAlive() === false,
            attacker: this,
            target
        }
    }

    sufferAttack = (damage) => {
        this.currentHp = this.currentHp - damage
        this.logger.debug(`${this.name} suffers ${damage} damage (${this.currentHp} remaining)`)

        if (this.currentHp <= 0) {
            this.logger.debug(`${this.name} has died`)
        }

    }

    forceSetHP(hp) {
        this.maxHp = hp
        this.currentHp = hp
        return this
    }

    setLogger(logger) {
        this.logger = logger
    }
}

BaseCharacter.prototype.toString = function () {
    return this.name
}

export default BaseCharacter
