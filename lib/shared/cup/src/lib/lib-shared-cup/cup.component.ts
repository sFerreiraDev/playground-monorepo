import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-cup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cup.component.html',
  styleUrl: './cup.component.less',
})
export class CupComponent {
  @Input() cupContents: string[] = [];
  @Input() selected = false;
  @Input() closed = false;
}
