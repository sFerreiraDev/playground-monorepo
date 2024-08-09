import { History } from './history';

describe(`History`, () => {
  it(`should create empty history`, () => {
    const history = new History<string>();
    expect(history.get()).toStrictEqual([]);
    expect(() => history.peek()).toThrow();
    expect(history.isEmpty()).toBe(true);
    expect(history.toString()).toBe(``);
  });
  it(`should add entry`, () => {
    const history = new History<string>();
    history.push('0->1');
    expect(history.get()).toStrictEqual(['0->1']);
    expect(history.peek()).toBe('0->1');
    expect(history.isEmpty()).toBe(false);
    expect(history.toString()).toBe('0->1');
  });
  it(`should remove entry`, () => {
    const history = new History<string>(['0->1', '2->1']);

    expect(history.toString()).toBe(`0->1 | 2->1`);

    expect(history.pop()).toStrictEqual('2->1');
    expect(history.get()).toStrictEqual(['0->1']);
    expect(history.peek()).toBe('0->1');
    expect(history.isEmpty()).toBe(false);

    expect(history.toString()).toBe(`0->1`);

    expect(history.pop()).toStrictEqual('0->1');
    expect(history.get()).toStrictEqual([]);
    expect(history.isEmpty()).toBe(true);

    expect(history.toString()).toBe(``);
  });
});
