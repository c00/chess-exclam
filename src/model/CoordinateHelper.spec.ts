import { coordinatesToIndex, indexToCoordinates } from './CoordinateHelper';

describe('Coordinate Helpers', () => {
  test('Coordinates To Index 1', () => {
    expect(coordinatesToIndex('a1')).toBe(0);
    expect(coordinatesToIndex('a2')).toBe(1);
    expect(coordinatesToIndex('b1')).toBe(8);
    expect(coordinatesToIndex('h1')).toBe(56);
    expect(coordinatesToIndex('h8')).toBe(63);
  });

  test('Index To Coords 1', () => {
    expect(indexToCoordinates(0)).toBe('a1');
    expect(indexToCoordinates(1)).toBe('a2');
    expect(indexToCoordinates(8)).toBe('b1');
    expect(indexToCoordinates(56)).toBe('h1');
    expect(indexToCoordinates(63)).toBe('h8');
  });
});
