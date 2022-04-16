export function indexToCoordinates(i: number): string {
  if (i < 0) throw 'index too small';
  if (i > 63) throw 'index too large';

  const row = rows[i % 8];
  const col = cols[Math.floor(i / 8)];

  return `${col}${row}`;
}

export function coordinatesToIndex(coords: string): number {
  if (coords.length !== 2) throw 'Incorrect coords: ' + coords;

  const colI = cols.indexOf(coords[0]);
  const rowI = rows.indexOf(coords[1]);
  if (colI === -1 || rowI === -1) throw 'Incorrect coords: ' + coords;

  return 8 * colI + rowI;
}

export function isLightSquare(i: number): boolean {
  const col = cols.indexOf(cols[Math.floor(i / 8)]);
  return Boolean((i + col) % 2 !== 0);
}

export function getRange(from: string, to: string) {
  const colStart = cols.indexOf(from[0]);
  const colEnd = cols.indexOf(to[0]);

  const rowStart = rows.indexOf(from[1]);
  const rowEnd = rows.indexOf(to[1]);

  const result = [];

  for (let c = colStart; c <= colEnd; c++) {
    for (let r = rowStart; r <= rowEnd; r++) {
      result.push(cols[c] + rows[r]);
    }
  }

  return result;
}

const rows = '12345678';
const cols = 'abcdefgh';
