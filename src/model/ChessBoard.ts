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

  constructor(showSquareCoords = false) {
    this.resetBoard(showSquareCoords);
  }

  resetBoard(showSquareCoords = false) {
    this.squares = [];
    this.coords = {};
    for (let i = 0; i < 64; i++) {
      const s = new ChessSquare(indexToCoordinates(i), isLightSquare(i));
      s.showCoords = showSquareCoords;
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

  highlightSquare(coords: string): void {
    this.squares.forEach(s => s.highlight = s.coords === coords);
  }

  disableSquares(coords: string[]): void {
    this.squares.forEach(s => s.disabled = coords.includes(s.coords));
  }

  enableSquares(coords: string[]): void {
    this.squares.forEach(s => s.disabled = !coords.includes(s.coords));
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
  ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',],
  ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',],
  ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',],
  ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',],
  ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',],
  ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',],
  ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',],
  ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',],
];
