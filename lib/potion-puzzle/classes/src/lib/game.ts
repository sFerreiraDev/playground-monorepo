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

  public readonly cups: Cup[];

  constructor(private readonly state: string) {
    this.cups = this.state.trim().split(Game.CUP_SPLITTER).map(cupState => Cup.createCup(cupState));
  }

  pour(fromCup: number, toCup: number) {
    const from = this.cups[fromCup];
    const to = this.cups[toCup];
    if (from.isEmpty() || to.isFull()) {
      throw Game.ERROR_ILEGAL_MOVE;
    }
    const item = from.peek();
    const topItem = to.isEmpty() ? null : to.peek();
    if (topItem && topItem !== item) {
      throw Game.ERROR_ILEGAL_MOVE;
    }
    to.push(from.pop());
    if (!from.isEmpty() && from.peek() === item) {
      this.pour(fromCup, toCup);
    }
  }

  getGameData() {
    return this.cups.map(cup => cup.items());
  }

  toString() {
    return this.cups.map(cup => cup.toString()).join(Game.CUP_SPLITTER);
  }
}