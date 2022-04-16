export class ChessSquare {
  showCoords = true;

  get coords(): string {
    return this._coords;
  }

  get isLight(): boolean {
    return this._isLight;
  }

  get isDark(): boolean {
    return !this._isLight;
  }

  get rank(): number {
    return Number(this.coords[1]);
  }

  get file(): string {
    return this.coords[0];
  }

  constructor(private _coords: string, private _isLight: boolean) {}
}
