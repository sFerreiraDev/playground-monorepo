export class NumberUtils {
  public static firstFreeIndex(ints: number[], start = 0, increment = 1): number {
    const all = new Set(ints);
    let target = start;
    while (all.has(target)) target += increment;
    return target;
  }
}
