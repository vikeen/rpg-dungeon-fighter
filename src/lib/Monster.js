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
        this.imageSize = 100
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center" key={this.uuid}>
                <img src={this.image}
                     style={{
                         width: this.imageSize,
                         height: this.imageSize,
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
}

export default Monster
