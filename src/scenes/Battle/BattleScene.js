import React, {useEffect, useState} from 'react';
import Battle from './Battle'

const BattleScene = ({heroes, monsters, start}) => {
    const [battling, setBattling] = useState(start)
    const [result, setResult] = useState(null)

    useEffect(() => {
        if (start && !battling) {
            const battle = new Battle(heroes, monsters)
            setBattling(true)
            battle.fight()
            setBattling(false)
            setResult(battle.result)
        }
    }, [start])

    return (
        <div>
            {result && (
                <div className="alert alert-info">
                    <div className="text-center text-uppercase">
                        <h2>{result.status}</h2>
                    </div>
                </div>
            )}
            <div className="d-flex flex-row justify-content-between align-items-center h-100">
                <div className="">
                    {heroes.map(hero => hero.render())}
                </div>
                <div className="d-flex flex-column">
                    {monsters.map(monster => monster.render())}
                </div>
            </div>
        </div>
    );
}

export default BattleScene;
