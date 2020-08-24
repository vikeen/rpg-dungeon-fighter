import Battle from "../../lib/Battle";
import Knight from "../../heroes/Knight/Knight";
import Goblin from "../../monsters/Goblin/Goblin";
import DragonKing from "../../monsters/Dragon King/DragonKing";

test('fight a battle where the heroes are victorious', () => {
    const heroes = [new Knight()]
    const monsters = [new Goblin()]
    const battle = new Battle(heroes, monsters)

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
    const battle = new Battle(heroes, monsters)

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
    const battle = new Battle(heroes, monsters)

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
    const battle = new Battle(heroes, monsters)

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
    const battle = new Battle(heroes, monsters)

    battle.fight()

    expect(battle.result).toEqual(expect.objectContaining({
        heroesAreAlive: true,
        monstersAreAlive: false,
        status: "victory",
    }))
});

test('fight a battle and keep track of total damage stats', () => {
    const heroes = [new Knight()]
    const monsters = [new Goblin(), new Goblin()]
    const battle = new Battle(heroes, monsters)

    battle.fight()

    expect(battle.stats).toEqual(expect.objectContaining({
        heroDamage: 16,
        heroesKilled: 0,
        monsterDamage: 16,
        monstersKilled: 2,
    }))
});
