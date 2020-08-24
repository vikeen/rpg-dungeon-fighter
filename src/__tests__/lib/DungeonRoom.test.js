import Knight from "../../heroes/Knight/Knight";
import Goblin from "../../monsters/Goblin/Goblin";
import DungeonRoom from "../../lib/DungeonRoom";
import DragonKing from "../../monsters/Dragon King/DragonKing";

test('should mark the room as unexplored if no battle has taken place', () => {
    const room = new DungeonRoom([new Goblin()])

    expect(room.battleStatus).toEqual("unexplored")
});

test('should mark the room as cleared if the battle was successful', () => {
    const heroes = [new Knight()]
    const room = new DungeonRoom([new Goblin()])

    room.fightBattle(heroes)

    expect(room.battleStatus).toEqual("cleared")
});

test('should mark the room as died if the battle was unsuccessful', () => {
    const heroes = [new Knight()]
    const room = new DungeonRoom([new DragonKing()])

    room.fightBattle(heroes)

    expect(room.battleStatus).toEqual("died")
});
