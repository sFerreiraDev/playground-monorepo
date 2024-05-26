import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Game } from '@playground-monorepo/lib/potion-puzzle/classes';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, FormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'playground-monorepo';
  cups?: Array<string[]>;
  game?: Game;

  state = `|1|2|3]
|3|2|3]
|1|2|1]
| | | ]`;

  constructor() {
    this.startGame(this.state);
  }

  selected?: number;
  clickHandler(cupIndex: number) {
    if (!this.game) return;
    if (this.selected == null) {
      this.selected = cupIndex;
      return;
    }
    if (this.selected === cupIndex) {
      delete this.selected;
      return;
    }
    try {
      this.game.pour(this.selected, cupIndex);
      delete this.selected;
      this.cups = this.game.getGameData();
    } catch (error) {
      this.selected = cupIndex;
      console.error(error)
    }
  }

  startGame(state: string) {
    this.state = state;
    this.game = new Game(this.state);
    this.cups = this.game.getGameData();
  }
}
