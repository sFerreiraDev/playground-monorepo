import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReplaySubject } from 'rxjs';

import { PotionPuzzle } from '@playground-monorepo/lib/potion-puzzle/classes';
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

  isWin$ = new ReplaySubject<boolean>(1);
  level!: number;
  moves!: string;

  constructor(private cdr: ChangeDetectorRef) {
    this.startGame();
  }

  clickHandler(cupIndex: number) {
    if (!this.isCupSelected()) {
      this.selectCup(cupIndex);
      return;
    }
    if (this.isSameCupSelected(cupIndex)) {
      this.deselectCup();
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.cups = this.game.pour(this.selected!, cupIndex);
      this.moves = this.game.getHistory();
      this.deselectCup();
    } catch (error) {
      this.selectCup(cupIndex);
      console.error(error);
    }

    if (this.game.isWin()) this.isWin$.next(true);
  }

  nextLevel() {
    if (this.game.isWin()) {
      this.game.passLevel();
      this.startGame();
    }
  }

  isCupSelected() {
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
    this.game.restart();
    this._updateView();
  }

  addEmptyCup() {
    this.cups = this.game.addCup();
    this._updateView();
  }

  roleBack() {
    this.game.roleBack();
    this._updateView();
  }

  startGame() {
    this.game.startNewGame();
    this._updateView();
  }

  private _updateView() {
    this.cups = this.game.getGameData();
    this.level = this.game.getLevel();
    this.moves = this.game.getHistory();
    this.isWin$.next(false);
  }
}
