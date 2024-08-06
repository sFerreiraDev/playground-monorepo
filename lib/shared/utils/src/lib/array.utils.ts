export class ArrayUtils {
  public static indexArray(length: number, start = 0): number[] {
    return Array.from(Array(length)).map((_, i) => i + start);
  }
  public static arrayOf<T>(length: number, item: T): T[] {
    return Array.from(Array(length)).map((_, i) => item);
  }
}
