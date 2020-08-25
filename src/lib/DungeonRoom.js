import React from 'react'
import {v4 as uuidv4} from "uuid";

import Battle from "./Battle";

const styles = {
    thumbnail : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        borderRadius: 45,
        margin: 20
    }
}

class DungeonRoom {
    constructor(monsters, options = {}) {
        this.uuid = uuidv4()
        this.monsters = monsters
        this.battleStatus = "unexplored"
        this.isBoss = options.isBoss === true
    }

    fightBattle(heroes) {
        const battle = new Battle(heroes, this.monsters)
        battle.fight()

        this.battleStatus = battle.result.status === "victory" ? "cleared" : "died"

        return battle
    }

    renderThumbnail() {
        let roomIcon = null

        if (this.battleStatus === "cleared") {
            roomIcon = (
                <div key={this.uuid} className="bg-success text-white" style={styles.thumbnail}>
                    <i className="ra ra-2x ra-crown" />
                </div>
            )
        } else if (this.battleStatus === "died") {
            roomIcon = (
                <div key={this.uuid} className="bg-danger text-white" style={styles.thumbnail}>
                    <i className="ra ra-2x ra-broken-skull" />
                </div>
            )
        } else {
            roomIcon = (
                <div key={this.uuid} className="bg-secondary text-light" style={styles.thumbnail}>
                    <i className="ra ra-2x ra-monster-skull" />
                </div>
            )
        }

        return (
            <div key={this.uuid}>
                {roomIcon}
                <div className="d-flex flex-row align-items-center justify-content-center">
                    {this.monsters.map(monster => monster.renderThumbnail(this.isBoss ? 50 : 30))}
                </div>
            </div>
        )
    }
}

export default DungeonRoom
