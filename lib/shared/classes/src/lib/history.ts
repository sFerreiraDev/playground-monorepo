import { Stack } from './stack';

export class History<T = unknown> extends Stack<T> {
  public static override readonly ERROR_EMPTY = `Empty history`;
  public static override readonly ERROR_OUT_OF_BOUND = (index: number) => `There's no entry for index ${index}`;

  constructor(contents?: Array<T>) {
    super(contents?.reverse());
  }

  override get(): T[] {
    return super.get().reverse();
  }

  override toString(): string {
    return `${[...this.stack].reverse().join(' | ')}`;
  }
}
