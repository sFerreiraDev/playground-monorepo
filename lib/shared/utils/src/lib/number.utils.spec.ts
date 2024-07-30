import { NumberUtils } from './number.utils';

describe(`NumberUtils`, () => {
  describe(`firstFreeIndex`, () => {
    it(`[], 0, 1 => 0`, () => {
      expect(NumberUtils.firstFreeIndex([])).toBe(0);
    });
    it(`[], .05, 1 => 0`, () => {
      expect(NumberUtils.firstFreeIndex([], .05)).toBe(.05);
    });
    it(`[0, 1, 3], 0, 1 => 2`, () => {
      expect(NumberUtils.firstFreeIndex([0,1,3])).toBe(2);
    });
    it(`[0, 1, 3], -1, 1 => 2`, () => {
      expect(NumberUtils.firstFreeIndex([0,1,3], -1)).toBe(-1);
    });
    it(`[0, 1, 3], 0, 1 => 2`, () => {
      expect(NumberUtils.firstFreeIndex([0,1,3], 3)).toBe(4);
    });
    it(`[-2, 0, 2], -3, 1 => -3`, () => {
      expect(NumberUtils.firstFreeIndex([-2, 0, 2], -3)).toBe(-3);
    });
    it(`[-2, 0, 2], -2, 1 => -1`, () => {
      expect(NumberUtils.firstFreeIndex([-2, 0, 2], -2)).toBe(-1);
    });
    it(`[-2, 0, 2], 0, 1 => 1`, () => {
      expect(NumberUtils.firstFreeIndex([-2, 0, 2])).toBe(1);
    });
    it(`[-.01, 0, .01, .03], 0, .01 => .02`, () => {
      expect(NumberUtils.firstFreeIndex([-.01, 0, .01, .03], 0, .01)).toBe(.02);
    });
    it(`[-.01, 0, .01, .03], .03, .01 => .04`, () => {
      expect(NumberUtils.firstFreeIndex([-.01, 0, .01, .03], .03, .01)).toBe(.04);
    });
  });
});
