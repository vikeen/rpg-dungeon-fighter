import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "rpg-awesome/css/rpg-awesome.min.css"

import DungeonScene from "./scenes/DungeonScene";
import Goblin from "./monsters/Goblin/Goblin";
import Knight from "./heroes/Knight/Knight";
import Dungeon from "./lib/Dungeon";
import DungeonRoom from "./lib/DungeonRoom";
import Mage from "./heroes/Mage/Mage";

const styles = {
    container: {
        width: 600,
    },
    controls: {
        width: 600,
    }
}

const App = () => {
    const [start, setStart] = useState(false)

    const heroes = [
        new Knight(),
        new Mage(),
    ]
    const dungeon = new Dungeon([
        new DungeonRoom([new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin()]),
    ])

    const handleEmbarkOnDungeonClick = () => {
        setStart(true)
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center fullscreen">
            <div style={styles.container}>
                <DungeonScene heroes={heroes} dungeon={dungeon} start={start}/>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mt-5">
                <div className="text-center" style={styles.controls}>
                    <button className="btn btn-primary m-2" onClick={handleEmbarkOnDungeonClick}>
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
