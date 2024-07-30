import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Facade, MOCK_GAME_STATE } from '@playground-monorepo/lib/potion-puzzle/classes';
import { CupComponent } from '@playground-monorepo/lib/shared/cup';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, FormsModule, CupComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'playground-monorepo';

  gameFacade: Facade = new Facade();
  cups: Array<string[]> = [];
  gameId = -1;
  selected?: number;

  state = MOCK_GAME_STATE;

  constructor() {
    this.startGame(this.state);
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
      this.cups = this.gameFacade.pour(this.selected, cupIndex, this.gameId);
      this.deselectCup();
    } catch (error) {
      this.selectCup(cupIndex);
      console.error(error)
    }
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

  startGame(state: string) {
    this.state = state;
    this.gameId = this.gameFacade.start(this.state);
    this.cups = this.gameFacade.getGameData(this.gameId);
  }
}
