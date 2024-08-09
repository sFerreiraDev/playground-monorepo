import { Stack } from './stack';

describe(`Stack`, () => {
  it(`should create empty stack`, () => {
    const empty = new Stack();
    expect(empty.size()).toBe(0);
    expect(empty.isEmpty()).toBe(true);
    expect(empty.toString()).toBe(`|]`);
  });
  it(`should throw error if pop on empty stack`, () => {
    const empty = new Stack();
    expect(() => empty.pop()).toThrow(Stack.ERROR_EMPTY);
  });
  it(`should throw error if peek on empty stack`, () => {
    const empty = new Stack();
    expect(empty.size()).toBe(0);
    expect(() => empty.peek()).toThrow(Stack.ERROR_EMPTY);
  });
  it(`should create stack with contents`, () => {
    const expected = `|1,2,3]`;
    const items = [1, 2, 3];
    const stack = new Stack(items);
    const returnedItems = stack.get();
    expect(stack.isEmpty()).toBe(false);
    expect(stack.size()).toBe(3);
    expect(stack.toString()).toBe(expected);
    expect(items).toStrictEqual(returnedItems);
    expect(returnedItems).toStrictEqual(stack['stack']);
    expect(items).toStrictEqual(stack['stack']);
    // ensure that a shalow clone is always created
    expect(items == returnedItems).toBeFalsy();
    expect(returnedItems == stack['stack']).toBeFalsy();
    expect(items == stack['stack']).toBeFalsy();
  });
  it(`should throw error if peek an index that doesn't exist stack`, () => {
    const testIndex = 3;
    const stack = new Stack([1, 2, 3]);
    expect(() => stack.peek(testIndex)).toThrow(Stack.ERROR_OUT_OF_BOUND(testIndex));
  });
  it(`should peek item`, () => {
    const expected = `|1,2,3]`;
    const stack = new Stack([1, 2, 3]);
    expect(stack.peek()).toBe(1);
    expect(stack.size()).toBe(3);
    expect(stack.toString()).toBe(expected);
  });
  it(`should pop item`, () => {
    const expected = `|2,3]`;
    const stack = new Stack([1, 2, 3]);
    expect(stack.pop()).toBe(1);
    expect(stack.size()).toBe(2);
    expect(stack.toString()).toBe(expected);
  });
  it(`should push 0`, () => {
    const expected = `|0,1,2,3]`;
    const stack = new Stack([1, 2, 3]);
    stack.push(0);
    expect(stack.size()).toBe(4);
    expect(stack.toString()).toBe(expected);
  });
});
