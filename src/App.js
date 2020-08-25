import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "rpg-awesome/css/rpg-awesome.min.css"

import DungeonScene from "./scenes/DungeonScene";
import Goblin from "./monsters/Goblin/Goblin";
import Knight from "./heroes/Knight/Knight";
import Dungeon from "./lib/Dungeon";
import DungeonRoom from "./lib/DungeonRoom";
import Mage from "./heroes/Mage/Mage";
import GoblinElite from "./monsters/Goblin Elite/GoblinElite";

const styles = {
    wrapper: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
}

const getGoldFromStorage = () => parseInt(localStorage.getItem('gold') || 0)
const getXpFromStorage = () => parseInt(localStorage.getItem('xp') || 0)

const App = () => {
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
    const [] = useState(null)

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
        <div className="d-flex flex-column justify-content-center align-items-center fullscreen"
             style={styles.wrapper}>
            <nav className="d-flex flex-row align-items-center justify-content-center w-100 mt-3 p-5">
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light mt-5">
                <div className="text-center">
                    <button className="btn btn-primary m-2" onClick={handleEmbarkOnDungeonClick}>
                        <i className="fas fa-play"></i> Start
                    </button>
                    <button className="btn btn-danger m-2" onClick={handleResetClick}>
                        <i className="fas fa-redo"></i> Reset
                    </button>
                </div>
            </nav>
            <div className="mt-5 card">
                <h3 className="card-title">Activity Log</h3>
                <div className="card-body">
                    {complete && dungeon.logger.render()}
                </div>
            </div>
        </div>
    );
}

export default App;
