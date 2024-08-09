export class Stack<T = unknown> {
  public static readonly ERROR_EMPTY: string = `Empty stack`;
  public static readonly ERROR_OUT_OF_BOUND = (index: number) => `There's no item for index ${index}`;

  protected readonly stack: Array<T>;

  constructor(contents?: Array<T>) {
    this.stack = contents ? [...contents] : [];
  }

  push(item: T) {
    this.stack.unshift(item);
  }

  peek(index = 0): T {
    if (!this.stack.length) throw Stack.ERROR_EMPTY;
    if (!this.stack[index]) throw Stack.ERROR_OUT_OF_BOUND(index);
    return this.stack[index];
  }

  pop(): T {
    if (!this.stack.length) throw Stack.ERROR_EMPTY;
    return this.stack.shift() as T;
  }

  size(): number {
    return this.stack.length;
  }

  isEmpty(): boolean {
    return !this.stack.length;
  }

  get(): T[] {
    return [...this.stack];
  }

  toString(): string {
    return `|${this.stack.join(',')}]`;
  }
}
