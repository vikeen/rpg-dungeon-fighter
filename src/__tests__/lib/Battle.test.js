import DungeonBattle from "../../lib/Battle";
import Knight from "../../heroes/Knight/Knight";
import Goblin from "../../monsters/Goblin/Goblin";
import DragonKing from "../../monsters/Dragon King/DragonKing";
import Mage from "../../heroes/Mage/Mage";
import DungeonRoom from "../../lib/DungeonRoom";
import Dungeon from "../../lib/Dungeon";

test('fight a battle where the heroes are victorious', () => {
    const heroes = [new Knight()]
    const monsters = [new Goblin()]
    const battle = new DungeonBattle(heroes, monsters)

    battle.fight()

    expect(battle.result).toEqual(expect.objectContaining({
        heroesAreAlive: true,
        monstersAreAlive: false,
        status: "victory",
    }))
});

test('fight a battle where the monsters are victorious', () => {
    const heroes = [new Knight()]
    const monsters = [new DragonKing()]
    const battle = new DungeonBattle(heroes, monsters)

    battle.fight()

    expect(battle.result).toEqual(expect.objectContaining({
        heroesAreAlive: false,
        monstersAreAlive: true,
        status: "defeat",
    }))
});

test('fight a battle with multiple monsters', () => {
    const heroes = [new Knight()]
    const monsters = [new Goblin(), new Goblin()]
    const battle = new DungeonBattle(heroes, monsters)

    battle.fight()

    expect(battle.result).toEqual(expect.objectContaining({
        heroesAreAlive: true,
        monstersAreAlive: false,
        status: "victory",
    }))
});

test('fight a battle with multiple heroes', () => {
    const heroes = [new Knight(), new Knight()]
    const monsters = [new Goblin()]
    const battle = new DungeonBattle(heroes, monsters)

    battle.fight()

    expect(battle.result).toEqual(expect.objectContaining({
        heroesAreAlive: true,
        monstersAreAlive: false,
        status: "victory",
    }))
});

test('fight a battle with multiple heroes and multiple monsters', () => {
    const heroes = [new Knight(), new Knight()]
    const monsters = [new Goblin(), new Goblin(), new Goblin(), new Goblin()]
    const battle = new DungeonBattle(heroes, monsters)

    battle.fight()

    expect(battle.result).toEqual(expect.objectContaining({
        heroesAreAlive: true,
        monstersAreAlive: false,
        status: "victory",
    }))
});

test('fight a battle and keep track of stats', () => {
    const heroes = [new Knight()]
    const monsters = [new Goblin(), new Goblin()]
    const battle = new DungeonBattle(heroes, monsters)

    battle.fight()

    expect(battle.stats).toEqual(expect.objectContaining({
        heroDamage: 16,
        heroesKilled: 0,
        monsterDamage: 12,
        monstersKilled: 2,
    }))
});

test('fight a battle and earn rewards', () => {
    const heroes = [new Knight()]
    const goblin1 = new Goblin().setGoldReward(10).setXpReward(40)
    const goblin2 = new Goblin().setGoldReward(10).setXpReward(40)
    const monsters = [goblin1, goblin2]
    const battle = new DungeonBattle(heroes, monsters)

    battle.fight()

    expect(battle.rewards).toEqual(expect.objectContaining({
        xp: 80,
        gold: 20
    }))
});

test('fight a battle and breakdown damage totals by hero and monster', () => {
    const injuredKnight = new Knight().forceSetHP(1)
    const mage = new Mage()
    const goblin1 = new Goblin()
    const goblin2 = new Goblin()
    const battle = new DungeonBattle([injuredKnight, mage], [goblin1, goblin2])

    battle.fight()

    expect(battle.stats.byHero).toEqual({
        [injuredKnight.uuid]: {
            damage: 4,
            kills: 0
        },
        [mage.uuid]: {
            damage: 12,
            kills: 2
        }
    })
    expect(battle.stats.byMonster).toEqual({
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

