import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibPotionPuzzleComponentsComponent } from './lib-potion-puzzle-components.component';

describe('LibPotionPuzzleComponentsComponent', () => {
  let component: LibPotionPuzzleComponentsComponent;
  let fixture: ComponentFixture<LibPotionPuzzleComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibPotionPuzzleComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibPotionPuzzleComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
