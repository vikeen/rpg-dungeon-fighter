import Knight from "../../heroes/Knight/Knight";
import Goblin from "../../monsters/Goblin/Goblin";
import DungeonRoom from "../../lib/DungeonRoom";
import Dungeon from "../../lib/Dungeon";
import DragonKing from "../../monsters/Dragon King/DragonKing";
import Mage from "../../heroes/Mage/Mage";

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

test('embark on a dungeon where the one hero dies, but another hero survives', () => {
    const injuredKnight = new Knight().forceSetHP(1)
    const mage = new Mage()
    const rooms = [
        new DungeonRoom([new Goblin(), new Goblin(), new Goblin()]), // knight will die here
        new DungeonRoom([new Goblin()]),
    ]
    const dungeon = new Dungeon(rooms)

    dungeon.embark([injuredKnight, mage])

    expect(injuredKnight.isAlive()).toBe(false)
    expect(mage.isAlive()).toBe(true)
    expect(dungeon.rooms[0].battleStatus).toEqual("cleared")
    expect(dungeon.rooms[1].battleStatus).toEqual("cleared")
    expect(dungeon.results.status).toEqual("victory")
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

    console.log(dungeon.stats.byRoom)
    expect(dungeon.stats.byRoom[0]).toEqual(expect.objectContaining(
        {
            heroDamage: 8,
            heroesKilled: 0,
            monsterDamage: 4,
            monstersKilled: 1
        },
    ))
    expect(dungeon.stats.byRoom[1]).toEqual(expect.objectContaining({
            heroDamage: 16,
            heroesKilled: 0,
            monsterDamage: 12,
            monstersKilled: 2
        }
    ))
    expect(dungeon.stats.byRoom[2]).toEqual(expect.objectContaining(
        {
            heroDamage: 28,
            heroesKilled: 1,
            monsterDamage: 28,
            monstersKilled: 3
        }
    ))
    expect(dungeon.stats.byRoom[3]).toEqual(undefined)
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
        monsterDamage: 16,
        monstersKilled: 3
    }))
    expect(dungeon.stats.byRoom.length).toBe(2)
    expect(dungeon.stats.byRoom[0]).toEqual(expect.objectContaining({
        heroDamage: 8,
        heroesKilled: 0,
        monsterDamage: 4,
        monstersKilled: 1,
    }))
    expect(dungeon.stats.byRoom[1]).toEqual(expect.objectContaining({
        heroDamage: 16,
        heroesKilled: 0,
        monsterDamage: 12,
        monstersKilled: 2,
    }))
    expect(dungeon.results.status).toBe("victory")
});

test('breakdown damage totals by hero and monster', () => {
    const injuredKnight = new Knight().forceSetHP(1)
    const mage = new Mage()
    const goblin1 = new Goblin()
    const goblin2 = new Goblin()
    const rooms = [
        new DungeonRoom([goblin1, goblin2])
    ]
    const dungeon = new Dungeon(rooms)

    dungeon.embark([injuredKnight, mage])

    expect(dungeon.stats.byHero).toEqual({
        [injuredKnight.uuid]: {
            damage: 4,
            kills: 0
        },
        [mage.uuid]: {
            damage: 12,
            kills: 2
        }
    })
    expect(dungeon.stats.byMonster).toEqual({
        [goblin1.uuid]: {
            damage: 4,
            kills: 1
        },
        [goblin2.uuid]: {
            damage: 4,
            kills: 0
        }
    })
});

test('should marks rooms after heroes death as unexplored', () => {
    const heroes = [new Knight()]
    const rooms = [
        new DungeonRoom([new Goblin()]),
        new DungeonRoom([new DragonKing()]), // dies here
        new DungeonRoom([new Goblin()]),
    ]

    const dungeon = new Dungeon(rooms)

    dungeon.embark(heroes)

    expect(rooms[0].battleStatus).toEqual("cleared")
    expect(rooms[1].battleStatus).toEqual("died")
    expect(rooms[2].battleStatus).toEqual("unexplored")
});
