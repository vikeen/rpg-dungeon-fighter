import React, {useEffect, useState} from 'react';

const DungeonScene = ({heroes, dungeon, start}) => {
    const {rooms} = dungeon
    const [embarking, setEmbarking] = useState(start)
    const [room, setRoom] = useState(rooms[0])
    const [results, setResults] = useState(null)

    useEffect(() => {
        if (start && !embarking) {
            setEmbarking(true)
            dungeon.embark(heroes)
            setEmbarking(false)
            setResults(dungeon.results)
        }
    }, [start])

    return (
        <div>
            {results && (
                <div className="alert alert-info">
                    <div className="text-center text-uppercase">
                        <h2>{results.status}</h2>
                    </div>
                </div>
            )}
            <div className="d-flex flex-row align-items-start">
                {rooms.map(room => room.renderThumbnail())}
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center h-100">
                <div className="">
                    {heroes.map(hero => hero.render())}
                </div>
                <div className="d-flex flex-column">
                    {room.monsters.map(monster => monster.render())}
                </div>
            </div>
        </div>
    );
}

export default DungeonScene;
