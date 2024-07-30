import { Cup } from '@playground-monorepo/lib/shared/classes';
import { Game } from './game';
import { MOCK_GAME_STATE } from './test';

describe('Game', () => {
  let game: Game;
  beforeEach(() => {
    game = new Game(MOCK_GAME_STATE)
  })
  it('should create', () => {
    expect(game).toBeDefined();
  });
  it('should be able to pour from cup index 0 to index 3', () => {
    game.pour(0, 3);

    const expectedString = `| |2|3]
|3|2|3]
|1|2|1]
| | |1]`;
    const expectedData = [
      [Cup.ITEM_EMPTY, '2', '3'],
      ['3', '2', '3'],
      ['1', '2', '1'],
      [Cup.ITEM_EMPTY, Cup.ITEM_EMPTY, '1'],
    ];

    expect(game.toString()).toEqual(expectedString);
    expect(game.getGameData()).toEqual(expectedData);
  });

  it('should throw an error when giving invalid indexes', () => {
    expect(() => game.pour(0, 4)).toThrow(Game.ERROR_INVALID_CUP);
    expect(() => game.pour(-1, 3)).toThrow(Game.ERROR_INVALID_CUP);
  });

  it('should throw an error when trying to fill a full cup', () => {
    expect(() => game.pour(0, 1)).toThrow(Game.ERROR_ILEGAL_MOVE);
  });

  it('should throw an error when trying to play from an empty cup', () => {
    expect(() => game.pour(3, 0)).toThrow(Game.ERROR_ILEGAL_MOVE);
  });

  it('should throw an error when trying to mix two diferent items', () => {
    game.pour(0, 3);
    expect(() => game.pour(0, 3)).toThrow(Game.ERROR_ILEGAL_MOVE);
  });

  it('should throw an error when trying to pour from to the same cup', () => {
    expect(() => game.pour(0, 0)).toThrow(Game.ERROR_ILEGAL_MOVE);
  });
});
