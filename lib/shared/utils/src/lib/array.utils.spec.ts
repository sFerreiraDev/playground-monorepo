import { ArrayUtils } from './array.utils';

describe(`ArrayUtils`, () => {
  describe(`indexArray`, () => {
    it(`should give a index array starting from 0`, () => {
      expect(ArrayUtils.indexArray(3)).toStrictEqual([0,1,2]);
    });
    it(`should give a index array starting from given value`, () => {
      expect(ArrayUtils.indexArray(3, 1)).toStrictEqual([1,2,3]);
    });
  });
  describe(`arrayOf`, () => {
    it(`should give an array of 'A'`, () => {
      expect(ArrayUtils.arrayOf(3, 'A')).toStrictEqual(['A','A','A']);
    });
  });
});
