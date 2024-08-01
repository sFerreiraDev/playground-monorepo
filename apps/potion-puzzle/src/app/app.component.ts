import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibPotionPuzzleComponentsComponent } from '@playground-monorepo/lib/potion-puzzle/components';

@Component({
  standalone: true,
  imports: [RouterModule, LibPotionPuzzleComponentsComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'potion-puzzle';
}
