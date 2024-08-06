import { Cup } from './cup';

describe('Cup', () => {
  it('should creat empty cup', () => {
    const empty = new Cup(3);
    expect(empty.isEmpty()).toBe(true);
    expect(empty.toString()).toStrictEqual(`| | | ]`);
  });
  it('should throw error if pop on empty cup', () => {
    const empty = new Cup(3);
    expect(() => empty.pop()).toThrow(Cup.ERROR_EMPTY);
  });
  it('should throw error if peek on empty cup', () => {
    const empty = new Cup(3);
    expect(() => empty.peek()).toThrow(Cup.ERROR_EMPTY);
  });
  it('should not create cup with contents bigger than capacity', () => {
    expect(() => new Cup(3, ['0', '1', '2', '3'])).toThrow(Cup.ERROR_NO_SPACE);
  });
  it('should create cup with contents', () => {
    const expected = `| |1|2]`;
    const cup = new Cup(3, ['1', '2']);
    expect(cup.isFull()).toBe(false);
    expect(cup.isClosed()).toBe(false);
    expect(cup.isEmpty()).toBe(false);
    expect(cup.peek()).toBe('1');
    expect(cup.toString()).toBe(expected);
  });
  it('should pop item', () => {
    const expected = `| |2|3]`;
    const cup = new Cup(3, ['1', '2', '3']);
    expect(cup.pop()).toBe('1');
    expect(cup.capacity).toBe(3);
    expect(cup.toString()).toBe(expected);
  });
  it('should push 0', () => {
    const expected = `|1|1|1|1]`;
    const cup = new Cup(4, ['1', '1', '1']);
    cup.push('1');
    expect(cup.isFull()).toBeTruthy();
    expect(cup.isClosed()).toBeTruthy();
    expect(cup.toString()).toBe(expected);
  });
});
