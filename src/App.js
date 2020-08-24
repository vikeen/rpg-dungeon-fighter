import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "rpg-awesome/css/rpg-awesome.min.css"

import BattleScene from "./scenes/Battle/BattleScene";
import Goblin from "./monsters/Goblin/Goblin";
import Knight from "./heroes/Knight/Knight";

const styles = {
    container: {
        width: 600,
    },
    controls: {
        width: 600,
    }
}

const App = () => {
    const [battle, setBattle] = useState(false)

    const heroes = [
        new Knight()
    ]
    const monsters = [
        new Goblin(),
    ]

    const handleStartBattleClick = () => {
        setBattle(true)
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center fullscreen">
            <div style={styles.container}>
                <BattleScene heroes={heroes} monsters={monsters} start={battle}/>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mt-5">
                <div className="text-center" style={styles.controls}>
                    <button className="btn btn-primary m-2" onClick={handleStartBattleClick}>
                        <i className="fas fa-play"></i> Start
                    </button>
                    <button className="btn btn-danger m-2">
                        <i className="fas fa-redo"></i> Reset
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default App;
