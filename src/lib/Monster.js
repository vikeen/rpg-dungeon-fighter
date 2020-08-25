import React from 'react'
import BaseCharacter from "./BaseCharacter";

const styles = {
    stat: {
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold'
    }
}

class Monster extends BaseCharacter {
    constructor() {
        super()
        this.imageWidth = 100
        this.rewards = {gold: 0, xp: 0}
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center" key={this.uuid}>
                <img src={this.image}
                     style={{
                         width: this.imageWidth,
                         margin: 10,
                         transform: 'scaleX(-1)',
                     }}
                     alt={this.name}
                />
                <small className="text-uppercase">{this.name}</small>
                <div className="d-flex flex-row">
                    <span className="badge badge-dark" style={styles.stat}>
                        {this.damage}&nbsp;
                        <i className="ra ra-sword"></i>
                    </span>
                    <span className="badge badge-success" style={styles.stat}>
                        {this.armor}&nbsp;
                        <i className="ra ra-shield"></i>
                    </span>
                    <span className="badge badge-danger" style={styles.stat}>
                        {this.currentHp}&nbsp;
                        <i className="ra ra-health"></i>
                    </span>
                </div>
            </div>
        )
    }

    renderThumbnail(size = 40) {
        return (
            <img src={this.image}
                 key={this.uuid}
                 style={{
                     height: size,
                     marginLeft: -5,
                     marginRight: -5,
                     transform: 'scaleX(-1)',
                     opacity: this.isAlive() ? 1 : 0.5
                 }}
                 alt={this.name}
            />
        )
    }

    setGoldReward(gold = 0) {
        this.rewards.gold = gold
        return this
    }

    setXpReward(xp = 0) {
        this.rewards.xp = xp
        return this
    }
}

export default Monster
