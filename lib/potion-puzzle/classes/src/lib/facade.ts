import { NumberUtils } from '@playground-monorepo/lib/shared/utils';
import { Game } from './game';

export class Facade {
  public static readonly ERROR_INVALID_GAME_ID = `Invalid game ID`;

  public readonly games = new Map<number, Game>();

  start(state: string) {
    const id = NumberUtils.firstFreeIndex([...this.games.keys()]);
    const game = new Game(state);
    this.games.set(id, game);
    return id;
  }

  end(gameOrId: number | Game) {
    const id = this._getGameId(gameOrId);
    this.games.delete(id);
  }

  pour(fromCup: number, toCup: number, gameOrId: number | Game) {
    const game = this._getGame(gameOrId);
    game.pour(fromCup, toCup);
    return game.getGameData();
  }

  getGameData(gameOrId: number | Game) {
    return this._getGame(gameOrId).getGameData();
  }

  toString(gameOrId: number | Game) {
    return  this._getGame(gameOrId).toString();
  }

  private _getGame(gameOrId: number | Game) {
    const game = typeof gameOrId === 'number' ? this.games.get(gameOrId) : gameOrId;
    if (!game) throw Facade.ERROR_INVALID_GAME_ID;
    return game;
  }

  private _getGameId(gameOrId: number | Game) {
    const gameId = typeof gameOrId === 'number' ? gameOrId : this._getGameIdFromGameInstance(gameOrId);
    if (!gameId || !this.games.get(gameId)) throw Facade.ERROR_INVALID_GAME_ID;
    return gameId;
  }

  private _getGameIdFromGameInstance(game: Game) {
    const maybeGameEntry = Array.from(this.games.entries()).find(([_, g]) => g == game);
    return maybeGameEntry?.[0];
  }
}