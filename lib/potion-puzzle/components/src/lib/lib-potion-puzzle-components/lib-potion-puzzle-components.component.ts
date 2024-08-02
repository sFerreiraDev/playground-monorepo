import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import {
  PotionPuzzle,
  MOCK_LEVELS_GAME_STATE,
} from '@playground-monorepo/lib/potion-puzzle/classes';
import { CupComponent } from '@playground-monorepo/lib/shared/cup';

@Component({
  selector: 'lib-lib-potion-puzzle-components',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CupComponent],
  templateUrl: './lib-potion-puzzle-components.component.html',
  styleUrl: './lib-potion-puzzle-components.component.css',
})
export class LibPotionPuzzleComponentsComponent {
  public game = new PotionPuzzle();
  cups: Array<string[]> = [];
  selected?: number;

  isWin$ = new BehaviorSubject<boolean>(false);
  state!: string;
  level!: number;

  constructor(private cdr: ChangeDetectorRef) {
    this.startGame();
  }

  clickHandler(cupIndex: number) {
    if (!this.isAnyCupSelected()) {
      this.selectCup(cupIndex);
      return;
    }
    if (this.isSameCupSelected(cupIndex)) {
      this.deselectCup();
      return;
    }
    // should never happen but typescript :/
    if (this.selected == null) return;
    try {
      this.cups = this.game.pour(this.selected, cupIndex);
      this.deselectCup();
    } catch (error) {
      this.selectCup(cupIndex);
      console.error(error);
    }

    if (this.game.isWin()) this.isWin$.next(true);
  }

  nextLevel() {
    this.game.passLevel();
    this.startGame();
  }

  isAnyCupSelected() {
    return this.selected != null;
  }

  isSameCupSelected(cupIndex: number) {
    return this.selected === cupIndex;
  }

  selectCup(cupIndex: number) {
    this.selected = cupIndex;
  }

  deselectCup() {
    delete this.selected;
  }

  restartLevel() {
    this.cups = this.game.restart();
  }

  startGame() {
    this.cups = this.game.startNewGame();
    this.level = this.game.getLevel();
    this.isWin$.next(false);
    this.state = MOCK_LEVELS_GAME_STATE[`level${this.game.getLevel() as 1 | 2 | 3 | 4}`]
  }
}
