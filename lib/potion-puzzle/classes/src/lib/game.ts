import { Cup } from '@playground-monorepo/lib/shared/classes';
/**
 * state - EX:
 *         |1|2|3]
 *         |3|2|3]
 *         |1|2|1]
 *         | | | ]
 */
export class Game {
  public static readonly CUP_SPLITTER = `\n`;
  public static readonly ERROR_ILEGAL_MOVE = `Ilegal Move`;
  public static readonly ERROR_INVALID_CUP = `Invalid Cup`;

  private cups: Cup[];

  constructor(private readonly initialState: string) {
    this.cups = this._createCups(this.initialState);
  }

  pour(fromCup: number, toCup: number, isForce = false) {
    if (fromCup === toCup) throw Game.ERROR_ILEGAL_MOVE;

    this._checkCups(fromCup, toCup);
    const from = this.cups[fromCup];
    const to = this.cups[toCup];
    if (from.isEmpty() || to.isFull()) throw Game.ERROR_ILEGAL_MOVE;

    const item = from.peek();
    const topItem = to.isEmpty() ? null : to.peek();
    if (topItem && topItem !== item && !isForce) throw Game.ERROR_ILEGAL_MOVE;

    to.push(from.pop());
    // push while all other items are the same
    if (!isForce && !from.isEmpty() && !to.isFull() && from.peek() === item) {
      this.pour(fromCup, toCup);
    }
  }

  restart() {
    this.cups = this._createCups(this.initialState);
  }

  addCup() {
    this.cups.push(this._createCup());
  }

  getCupAmountItems(cupIndex: number) {
    return this.cups[cupIndex].amountItems();
  }

  getGameData() {
    return this.cups.map((cup) => cup.itemsWithEmpty());
  }

  toString() {
    return this.cups.map((cup) => cup.toString()).join(Game.CUP_SPLITTER);
  }

  isWin() {
    return this.cups.every((cup) => cup.isClosed() || cup.isEmpty());
  }

  private _checkCupIndex(index: number) {
    if (!(index >= 0) || !this.cups[index]) throw Game.ERROR_INVALID_CUP;
  }

  private _checkCups(...cupIndexes: number[]) {
    cupIndexes.forEach((i) => this._checkCupIndex(i));
  }

  private _createCups(state: string): Cup<string>[] {
    const split = this._getCupsStates(state);
    return split.map((cupState) => this._createCup(cupState));
  }

  private _getCupsStates(state: string): string[] {
    const trim = state.trim();
    return trim.split(Game.CUP_SPLITTER);
  }

  // Here we assume that all cups have the same size
  private _getCupsSize() {
    return this.cups[0].capacity;
  }

  private _createCup(state?: string): Cup<string> {
    const stateOrCapacity = state ? state : this._getCupsSize();
    return Cup.createCup(stateOrCapacity);
  }
}
