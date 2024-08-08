import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibPotionPuzzleComponentsComponent } from './lib-potion-puzzle-components.component';
import { Cup } from '@playground-monorepo/lib/shared/classes';
import { map } from 'rxjs';

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

  it('should select cup', () => {
    component.clickHandler(0);
    expect(component.selected).toBe(0);
  });

  it('should deselect cup', () => {
    component.clickHandler(0);
    component.clickHandler(0);
    expect(component.selected).toBe(undefined);
  });

  it('should pour', () => {
    const spy = jest.spyOn(component.game, 'pour');
    const initialState = component.cups;
    component.clickHandler(0);
    component.clickHandler(2);
    expect(spy).toHaveBeenCalledWith(0, 2);
    expect(component.selected).toBe(undefined);
    expect(component.cups).not.toStrictEqual(initialState);
  });

  it('should restart', () => {
    const initialState = component.cups;
    component.clickHandler(0);
    component.clickHandler(2);
    expect(component.cups).not.toStrictEqual(initialState);
    component.restartLevel();
    expect(component.cups).toStrictEqual(initialState);
  });

  it('should add new cup', () => {
    expect(component.cups.length).toBe(4);
    component.addEmptyCup();
    expect(component.cups.length).toBe(5);
    expect(component.cups[4].every((item) => item === Cup.ITEM_EMPTY)).toBe(true);
  });

  it('should win the game and pass level', (done) => {
    const spy = jest.spyOn(component.game['levelManager'], 'getLevelState');
    spy.mockImplementationOnce(() => `| |1|1]\n| | |1]`);

    component.isWin$.pipe(map<boolean, [boolean, number]>((win, index) => [win, index])).subscribe(([win, index]) => {
      if (index === 0) {
        expect(win).toBe(true);
      }
      if (index === 1) {
        expect(win).toBe(false);
        done();
      }
      if (index > 1) throw 'Should not trigger any more!';
    });

    component.startGame();
    component.clickHandler(1);
    component.clickHandler(0);
    expect(component.game.isWin()).toBe(true);
    expect(component.level).toBe(1);

    component.nextLevel();
    expect(component.level).toBe(2);
    expect(component.game.isWin()).toBe(false);
  });
});
