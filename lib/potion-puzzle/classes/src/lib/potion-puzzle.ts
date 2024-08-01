import { Game } from './game';
import { LevelManager } from './level-manager';

export class PotionPuzzle {
  public static readonly ERROR_NO_GAME_IN_PROGRESS = `No game in progress`;
  public static readonly ERROR_GAME_NOT_FINISHED = `Game is not finished yet`;

  private readonly levelManager = new LevelManager();
  private game!: Game;

  startNewGame() {
    const gameState = this.levelManager.getLevelState();
    this.game = new Game(gameState);
    return this.game.getGameData();
  }

  pour(fromCup: number, toCup: number) {
    if (!this.game || this.game.isWin())
      throw PotionPuzzle.ERROR_NO_GAME_IN_PROGRESS;

    this.game.pour(fromCup, toCup);
    return this.game.getGameData();
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
}
