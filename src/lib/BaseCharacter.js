import React from 'react'
import {v4 as uuidv4} from 'uuid'

class BaseCharacter {
    constructor() {
        this.uuid = uuidv4()
    }

    isAlive = () => {
        return this.currentHp > 0
    }

    attack = (target) => {
        console.debug(`${this.name} attacks ${target.name} for ${this.damage} damage`)
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
        console.debug(`${this.name} suffers ${damage} damage (${this.currentHp} remaining)`)

        if (this.currentHp <= 0) {
            console.debug(`${this.name} has died`)
        }

    }

    forceSetHP(hp) {
        this.maxHp = hp
        this.currentHp = hp
        return this
    }
}

export default BaseCharacter
