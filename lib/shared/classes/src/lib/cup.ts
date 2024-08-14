import { Stack } from './stack';
import { ArrayUtils } from '@playground-monorepo/lib/shared/utils';

/**
 * state - EX: `|1|2|3]`
 */
export class Cup<T extends string = string> {
  public static readonly ITEM_EMPTY = ` `;
  public static readonly ITEM_SPLITTER = `|`;
  public static readonly CUP_BOTTOM = `]`;
  public static readonly ERROR_NO_SPACE = `No space available`;
  public static readonly ERROR_EMPTY = `Empty cup`;

  public static createCup(state: string | number, emptyItem = Cup.ITEM_EMPTY, splitter = Cup.ITEM_SPLITTER) {
    state = typeof state === 'string' ? state : Cup.getCupEmptyState(state);
    const allItems = state.substring(1, state.length - 1).split(splitter);

    const notEmptyItems = allItems.filter((v) => v !== emptyItem);
    return new Cup(allItems.length, notEmptyItems);
  }

  public static getCupEmptyState(size: number) {
    const emptyState = Array.from(new Array(size))
      .map((_) => Cup.ITEM_EMPTY)
      .join(Cup.ITEM_SPLITTER);
    return Cup.ITEM_SPLITTER + emptyState + Cup.CUP_BOTTOM;
  }

  private readonly stack: Stack<T>;

  constructor(public readonly capacity: number, contents?: T[]) {
    if (contents && contents.length > capacity) throw Cup.ERROR_NO_SPACE;
    this.stack = new Stack(contents ?? []);
  }

  push(item: T): void {
    if (this.isFull()) throw Cup.ERROR_NO_SPACE;
    this.stack.push(item);
  }

  peek(): T {
    if (this.isEmpty()) throw Cup.ERROR_EMPTY;
    return this.stack.peek();
  }

  pop(): T {
    if (this.isEmpty()) throw Cup.ERROR_EMPTY;
    return this.stack.pop();
  }

  isEmpty() {
    return this.stack.size() === 0;
  }

  isFull() {
    return this.stack.size() === this.capacity;
  }

  isClosed() {
    return this.stack.size() === this.capacity && this.areAllEqual();
  }

  amountEmptySpaces() {
    return this.capacity - this.stack.size();
  }

  amountItems() {
    return this.stack.size();
  }

  items() {
    return [...this.stack.get().map((i) => i.toString())];
  }

  itemsWithEmpty() {
    return this._itemsWithEmpty();
  }

  toString(): string {
    return `|${this._itemsWithEmpty().join(Cup.ITEM_SPLITTER)}]`;
  }

  private _itemsWithEmpty() {
    const emptySpaces = this.amountEmptySpaces();
    return [...ArrayUtils.arrayOf(emptySpaces, Cup.ITEM_EMPTY), ...this.items()];
  }

  private areAllEqual(): boolean {
    if (this.stack.isEmpty()) return true;
    const first = this.stack.peek();
    return this.stack.get().every((item) => item === first);
  }
}
