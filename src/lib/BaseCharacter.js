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
    }

    sufferAttack = (damage) => {
        this.currentHp = this.currentHp - damage
        console.debug(`${this.name} suffers ${damage} damage (${this.currentHp} remaining)`)

    }
}

export default BaseCharacter
