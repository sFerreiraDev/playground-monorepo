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

    const fromCupAmount = this.game.getCupAmountItems(fromCup);

    this.game.pour(fromCup, toCup);

    const newFromCupAmount = this.game.getCupAmountItems(fromCup);
    const amountOfMoves = fromCupAmount - newFromCupAmount;

    for (let moveIndex = 0; moveIndex < amountOfMoves; moveIndex++) {
      this._addMoveEntry(fromCup, toCup);
    }

    return this.getGameData();
  }

  getGameData() {
    return this.game.getGameData();
  }

  restart() {
    this.game.restart();
    this.history.clear();
    return this.game.getGameData();
  }

  addCup() {
    this.game.addCup();
    return this.game.getGameData();
  }

  roleBack(): string[][] {
    const lastMove = this.history.peek();
    const [toCup, fromCup] = PotionPuzzle.getCupsFromMove(lastMove);

    this.game.pour(fromCup, toCup, true);
    this.history.pop();

    if (this.history.size() && this.history.peek() === lastMove) {
      return this.roleBack();
    }

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
