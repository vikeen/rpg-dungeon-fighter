import React from 'react'
import {v4 as uuidv4} from "uuid";

import Battle from "./Battle";
import ActivityLog from "./ActivityLog";

const styles = {
    thumbnail : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        borderRadius: 35,
        margin: 20
    },
    icon: {
        fontSize: 30
    }
}

class DungeonRoom {
    constructor(monsters, options = {}) {
        this.uuid = uuidv4()
        this.monsters = monsters
        this.battleStatus = "unexplored"
        this.isBoss = options.isBoss === true
        this.logger = new ActivityLog()
    }

    fightBattle(heroes) {
        const battle = new Battle(heroes, this.monsters)
        battle.setLogger(this.logger)
        battle.fight()

        this.battleStatus = battle.result.status === "victory" ? "cleared" : "died"

        return battle
    }

    renderThumbnail() {
        let roomIcon = null

        if (this.battleStatus === "cleared") {
            roomIcon = (
                <div key={this.uuid} className="bg-success text-white" style={styles.thumbnail}>
                    <i style={styles.icon} className="ra ra-crown" />
                </div>
            )
        } else if (this.battleStatus === "died") {
            roomIcon = (
                <div key={this.uuid} className="bg-danger text-white" style={styles.thumbnail}>
                    <i style={styles.icon} className="ra ra-broken-skull" />
                </div>
            )
        } else {
            roomIcon = (
                <div key={this.uuid} className="bg-secondary text-light" style={styles.thumbnail}>
                    <i style={{...styles.icon, fontSize: 25}} className="fas fa-question" />
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

    setLogger(logger) {
        this.logger = logger
    }
}

export default DungeonRoom
