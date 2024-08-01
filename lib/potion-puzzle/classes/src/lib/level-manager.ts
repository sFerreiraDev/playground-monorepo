import { MOCK_LEVELS_GAME_STATE } from './test';

export class LevelManager {
  public static readonly ERROR_LEVEL_NOT_FOUND = 'Error fetching the level';

  private currentLevel = 1;

  getCurrentLevel() {
    return this.currentLevel;
  }

  getLevelState() {
    return this._getLevelState(this.currentLevel);
  }

  passLevel() {
    this.currentLevel += 1;
  }

  private _getLevelState(level: number) {
    const l = level as 1 | 2 | 3 | 4;
    const state = MOCK_LEVELS_GAME_STATE[`level${l}`] as string;
    if (!state) throw LevelManager.ERROR_LEVEL_NOT_FOUND;
    return state;
  }
}
