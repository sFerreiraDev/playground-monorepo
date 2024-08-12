import { Game } from './game';
import { LevelManager } from './level-manager';
import { History } from '@playground-monorepo/lib/shared/classes';

export class PotionPuzzle {
  public static readonly ERROR_NO_GAME_IN_PROGRESS = `No game in progress`;
  public static readonly ERROR_GAME_NOT_FINISHED = `Game is not finished yet`;
  public static readonly SPLITTER_MOVE_ENTRY = ` -> `;

  private readonly levelManager = new LevelManager();
  private readonly history = new History<string>();
  private game!: Game;

  static getCupsFromMove(move: string): [number, number] {
    const split = move.split(PotionPuzzle.SPLITTER_MOVE_ENTRY);
    return [Number.parseInt(split[0]), Number.parseInt(split[1])];
  }

  startNewGame() {
    const gameState = this.levelManager.getLevelState();
    this.game = new Game(gameState);
    this.history.clear();
    return this.game.getGameData();
  }

  pour(fromCup: number, toCup: number) {
    if (!this.game || this.game.isWin()) throw PotionPuzzle.ERROR_NO_GAME_IN_PROGRESS;

    this.game.pour(fromCup, toCup);
    this._addMoveEntry(fromCup, toCup);

    return this.getGameData();
  }

  getGameData() {
    return this.game.getGameData();
  }

  restart() {
    this.game.restart();
    return this.game.getGameData();
  }

  addCup() {
    this.game.addCup();
    return this.game.getGameData();
  }

  roleBack() {
    const lastMove = this.history.peek();
    const [toCup, fromCup] = PotionPuzzle.getCupsFromMove(lastMove);

    // this is not suficient information to roleback the play, because it's not posible to
    // know what was the ammount of items that were pouered in the last play.
    // I need to add the state as info on the history entry.
    this.game.pour(fromCup, toCup, true);
    this.history.pop();

    return this.getGameData();
  }

  getLevel() {
    return this.levelManager.getCurrentLevel();
  }

  isWin() {
    if (!this.game) throw PotionPuzzle.ERROR_NO_GAME_IN_PROGRESS;

    return this.game.isWin();
  }

  passLevel() {
    if (!this.game.isWin()) throw PotionPuzzle.ERROR_GAME_NOT_FINISHED;

    this.levelManager.passLevel();
    this.startNewGame();
  }

  getHistory() {
    return this.history.toString();
  }

  private _addMoveEntry(fromCup: number, toCup: number) {
    const historyEntry = this._createMoveEntry(fromCup, toCup);
    this.history.push(historyEntry);
  }

  private _createMoveEntry(fromCup: number, toCup: number) {
    return `${fromCup}${PotionPuzzle.SPLITTER_MOVE_ENTRY}${toCup}`;
  }
}
