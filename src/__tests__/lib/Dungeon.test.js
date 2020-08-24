import Knight from "../../heroes/Knight/Knight";
import Goblin from "../../monsters/Goblin/Goblin";
import DungeonRoom from "../../lib/DungeonRoom";
import Dungeon from "../../lib/Dungeon";
import DragonKing from "../../monsters/Dragon King/DragonKing";

test('embark on dungeon with two battles and where the heroes are victorious', () => {
    const heroes = [new Knight()]
    const rooms = [
        new DungeonRoom([new Goblin()]),
        new DungeonRoom([new Goblin()]),
    ]
    const dungeon = new Dungeon(rooms)

    dungeon.embark(heroes)

    expect(dungeon.results).toEqual(expect.objectContaining({
        heroesAreAlive: true,
        monstersAreAlive: false,
        status: "victory",
    }))
});

test('embark on a dungeon where the heroes are defeated', () => {
    const heroes = [new Knight()]
    const rooms = [
        new DungeonRoom([new Goblin()]),
        new DungeonRoom([new Goblin()]),
        new DungeonRoom([new DragonKing()]),
    ]
    const dungeon = new Dungeon(rooms)

    dungeon.embark(heroes)

    expect(dungeon.results).toEqual(expect.objectContaining({
        heroesAreAlive: false,
        monstersAreAlive: true,
        status: "defeat",
    }))
});

test('embark on a dungeon where the heroes are slowly worn down and die', () => {
    const heroes = [new Knight()]
    const rooms = [
        new DungeonRoom([new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin(), new Goblin(), new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin(), new Goblin(), new Goblin()]),
    ]
    const dungeon = new Dungeon(rooms)

    dungeon.embark(heroes)

    expect(dungeon.stats.byRoom).toEqual([
        {
            heroDamage: 8,
            heroesKilled: 0,
            monsterDamage: 8,
            monstersKilled: 1
        },
        {
            heroDamage: 16,
            heroesKilled: 0,
            monsterDamage: 16,
            monstersKilled: 2
        },
        {
            heroDamage: 20,
            heroesKilled: 1,
            monsterDamage: 20,
            monstersKilled: 2
        },
        {
            // Heroes die before they get to the final room
            heroDamage: 0,
            heroesKilled: 0,
            monsterDamage: 0,
            monstersKilled: 0
        }
    ])
    expect(dungeon.results).toEqual(expect.objectContaining({
        heroesAreAlive: false,
        monstersAreAlive: true,
        status: "defeat",
    }))
});

test('collect stats for each dungeon room battle and the dungeon total', () => {
    const heroes = [new Knight()]
    const rooms = [
        new DungeonRoom([new Goblin()]),
        new DungeonRoom([new Goblin(), new Goblin()]),
    ]
    const dungeon = new Dungeon(rooms)

    dungeon.embark(heroes)

    expect(dungeon.stats).toEqual(expect.objectContaining({
        heroDamage: 24,
        heroesKilled: 0,
        monsterDamage: 24,
        monstersKilled: 3
    }))
    expect(dungeon.stats.byRoom).toEqual([{
        heroDamage: 8,
        heroesKilled: 0,
        monsterDamage: 8,
        monstersKilled: 1,
    }, {
        heroDamage: 16,
        heroesKilled: 0,
        monsterDamage: 16,
        monstersKilled: 2,
    }])
});
