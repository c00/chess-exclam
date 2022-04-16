import { ChessBoard } from './ChessBoard';
import { coordinatesToIndex } from './CoordinateHelper';
describe('ChessBoard', () => {
  test('Reset Board', () => {
    const b = new ChessBoard();
    expect(b.squares.length).toBe(64);

    let i = 0;
    for (const s of b.squares) {
      expect(coordinatesToIndex(s.coords)).toBe(i)
      i++;
    }
  });

});
