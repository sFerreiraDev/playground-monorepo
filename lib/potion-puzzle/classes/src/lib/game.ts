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

  public readonly cups: Cup[];

  constructor(private readonly state: string) {
    this.cups = this.state.trim().split(Game.CUP_SPLITTER).map(cupState => Cup.createCup(cupState));
  }

  pour(fromCup: number, toCup: number) {
    if (fromCup === toCup) throw Game.ERROR_ILEGAL_MOVE;

    this._checkCups(fromCup, toCup);
    const from = this.cups[fromCup];
    const to = this.cups[toCup];
    if (from.isEmpty() || to.isFull()) throw Game.ERROR_ILEGAL_MOVE;

    const item = from.peek();
    const topItem = to.isEmpty() ? null : to.peek();
    if (topItem && topItem !== item) throw Game.ERROR_ILEGAL_MOVE;

    to.push(from.pop());
    // push while all other items are the same
    if (!from.isEmpty() && !to.isFull() && from.peek() === item) {
      this.pour(fromCup, toCup);
    }
  }

  getGameData() {
    return this.cups.map(cup => cup.items());
  }

  toString() {
    return this.cups.map(cup => cup.toString()).join(Game.CUP_SPLITTER);
  }
  
  // TODO: WINING CONDITION LOGIC

  private _checkCupIndex(index: number) {
    if (!(index >= 0) || !this.cups[index]) throw Game.ERROR_INVALID_CUP;
  }

  private _checkCups(...cupIndexes: number[]) {
    cupIndexes.forEach(i => this._checkCupIndex(i));
  }
}