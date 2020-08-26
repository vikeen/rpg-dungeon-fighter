import React, {useEffect, useState} from "react";

import DungeonScene from "../scenes/DungeonScene";
import Knight from "../heroes/Knight/Knight";
import Mage from "../heroes/Mage/Mage";
import Dungeon from "../lib/Dungeon";
import DungeonRoom from "../lib/DungeonRoom";
import Goblin from "../monsters/Goblin/Goblin";
import GoblinElite from "../monsters/Goblin Elite/GoblinElite";
import Services from "../services";

const getGoldFromStorage = () => parseInt(localStorage.getItem('gold') || 0)
const getXpFromStorage = () => parseInt(localStorage.getItem('xp') || 0)

const height = 600

const styles = {
    container: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height
    },
    sidebar: {
        background: "#f6f6f6",
        width: 150,
        padding: 10,
        height
    },
    content: {
        width: '100%',
        maxWidth: 600,
    },
    log: {
        width: 350,
        padding: 10,
        height
    },
}

const DungeonPage = () => {
    const [start, setStart] = useState(false)
    const [complete, setComplete] = useState(false)
    const [gold, setGold] = useState(getGoldFromStorage())
    const [xp, setXp] = useState(getXpFromStorage())

    const [heroes, setHeroes] = useState([
        new Knight(),
        new Mage(),
    ])
    const [dungeon, setDungeon] = useState(new Dungeon(heroes, [
        new DungeonRoom([new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin(), new Goblin()]),
        new DungeonRoom([new GoblinElite()], {
            isBoss: true
        }),
    ]))

    useEffect(() => {
        dungeon.on('end', () => {
            setComplete(true)
            const rewards = dungeon.getRewards()
            const newGold = getGoldFromStorage() + parseInt(rewards.gold)
            const newXp = getXpFromStorage() + parseInt(rewards.xp)
            localStorage.setItem('gold', newGold)
            localStorage.setItem('xp', newXp)
            setGold(newGold)
            setXp(newXp)
        })
    }, [])

    const handleEmbarkOnDungeonClick = () => {
        setStart(true)
    }

    const handleResetClick = () => {
        setGold(0)
        setXp(0)
        localStorage.setItem('gold', 0)
        localStorage.setItem('xp', 0)
    }

    return (
        <div className="d-flex flex-row">
            <div style={styles.sidebar}>
                <h4 className="text-center">Controls</h4>
                <div className="d-flex flex-column">
                    <button className="btn btn-outline-secondary btn-block"
                            onClick={handleEmbarkOnDungeonClick}>
                        <i className="fas fa-play"></i> Start
                    </button>
                    <button className="btn btn-outline-secondary btn-block" onClick={handleResetClick}>
                        <i className="fas fa-redo"></i> Reset
                    </button>
                </div>
            </div>
            <div className="flex-grow-1 d-flex justify-content-center border">
                <div style={styles.content}>
                    <nav className="d-flex flex-row align-items-center justify-content-center w-100">
                        <h3>
                            <span className="badge badge-warning m-2">
                                <i className="ra ra-gold-bar"/> {gold}g
                            </span>
                        </h3>
                        <h3>
                            <span className="badge badge-info m-2">
                                <i className="ra ra-book"/> {xp}xp
                            </span>
                        </h3>
                    </nav>
                    <DungeonScene heroes={heroes} dungeon={dungeon} start={start}/>
                </div>
            </div>
            <div className="border d-flex flex-column" style={styles.log}>
                <h4 className="text-center">Log</h4>
                <div className="flex-grow-1 overflow-auto">
                    {complete && dungeon.logger.render()}
                </div>
            </div>
        </div>
    )
}

export default DungeonPage
