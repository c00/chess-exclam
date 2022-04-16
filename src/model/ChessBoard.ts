import { ChessSquare } from './ChessSquare';
import { indexToCoordinates, isLightSquare } from './CoordinateHelper';

export class ChessBoard {
  squares: ChessSquare[]; //Array of all squares
  coords: Record<string, ChessSquare>; //Hashtable of coordinates
  board: ChessSquare[][]; //Rows, cols
  showSideCoords = true;

  private _playerColor: ChessColor = 'white';

  get playerColor(): ChessColor {
    return this._playerColor;
  }

  constructor() {
    this.resetBoard();
  }

  resetBoard() {
    this.squares = [];
    this.coords = {};
    for (let i = 0; i < 64; i++) {
      const s = new ChessSquare(indexToCoordinates(i), isLightSquare(i));
      this.squares.push(s);
      this.coords[s.coords] = s;
    }

    this.board = [];
    for (const layoutRow of layout) {
      const row = [];
      this.board.push(row);
      for (const coord of layoutRow) {
        row.push(this.coords[coord]);
      }
    }
    console.log(this);
  }

  toggleSideCoords() {
    this.showSideCoords = !this.showSideCoords;
  }

  showSquareCoords(show = true): void {
    for (let s of this.squares) {
      s.showCoords = show;
    }
  }

  hideSquareCoords(): void {
    this.showSquareCoords(false);
  }

  setColor(color: ChessColor) {
    if (color === this.playerColor) return;

    this._playerColor = color;
    this.board.forEach((r) => r.reverse());
    this.board.reverse();
  }

  flip() {
    const color = this._playerColor === 'black' ? 'white' : 'black';
    this.setColor(color);
  }
}

export type ChessColor = 'white' | 'black';

const layout = [
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'],
  ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8'],
  ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'],
  ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
  ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'],
  ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'],
  ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'],
  ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'],
];
