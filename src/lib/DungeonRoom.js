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
    constructor(monsters) {
        this.uuid = uuidv4()
        this.monsters = monsters
        this.battleStatus = "unexplored"
    }

    fightBattle(heroes) {
        const battle = new Battle(heroes, this.monsters)
        battle.fight()

        this.battleStatus = battle.result.status === "victory" ? "cleared" : "died"

        return battle
    }

    renderThumbnail() {
        if (this.battleStatus === "cleared") {
            return (
                <div key={this.uuid}
                     className="bg-success text-white"
                     style={styles.thumbnail}
                ><i className="ra ra-2x ra-crown" /></div>
            )
        } else if (this.battleStatus === "died") {
            return (
                <div key={this.uuid}
                     className="bg-danger text-white"
                     style={styles.thumbnail}
                ><i className="ra ra-2x ra-broken-skull" /></div>
            )
        } else {
            return (
                <div key={this.uuid}
                     className="bg-secondary text-light"
                     style={styles.thumbnail}
                ><i className="ra ra-2x ra-monster-skull" /></div>
            )
        }
    }
}

export default DungeonRoom
