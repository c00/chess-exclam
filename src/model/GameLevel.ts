import { ChessColor } from './ChessBoard';
import { getRange } from './CoordinateHelper';
import { GameMode, GameOptions } from './Game';

export interface GameLevel {
  id?: number;
  name: string;
  side: ChessColor;
  squares: string[];
  mode: GameMode;
  pointsRequired: number;
  opts?: Partial<GameOptions>;
}

export const levels: GameLevel[] = [
  {
    name: 'Level 1',
    side: 'white',
    mode: 'pick-square',
    squares: getRange('a1', 'd4'),
    pointsRequired: 0,
    id: 1,
  },
  {
    name: 'Level 2',
    side: 'white',
    mode: 'pick-coords',
    squares: getRange('a1', 'd4'),
    pointsRequired: 0,
    id: 2,
  },
  {
    name: 'Level 3',
    side: 'black',
    mode: 'pick-square',
    squares: getRange('a1', 'd4'),
    pointsRequired: 1,
    id: 3,
  },
  {
    name: 'Level 4',
    side: 'black',
    mode: 'pick-coords',
    squares: getRange('a1', 'd4'),
    pointsRequired: 2,
    id: 4,
  },
  {
    name: 'Level 5',
    side: 'white',
    mode: 'pick-square',
    squares: getRange('a5', 'd8'),
    pointsRequired: 3,
    id: 5,
  },
  {
    name: 'Level 6',
    side: 'white',
    mode: 'pick-coords',
    squares: getRange('a5', 'd8'),
    pointsRequired: 4,
    id: 6,
  },
  {
    name: 'Level 7',
    side: 'black',
    mode: 'pick-square',
    squares: getRange('a5', 'd8'),
    pointsRequired: 5,
    id: 7,
  },
  {
    name: 'Level 8',
    side: 'black',
    mode: 'pick-coords',
    squares: getRange('a5', 'd8'),
    pointsRequired: 6,
    id: 8,
  },

  {
    name: 'Trials 1',
    side: 'white',
    mode: 'pick-coords',
    squares: getRange('a1', 'd8'),
    pointsRequired: 8,
    id: 9,
  },
  {
    name: 'Trials 2',
    side: 'black',
    mode: 'pick-coords',
    squares: getRange('a1', 'd8'),
    pointsRequired: 8,
    id: 10,
  },
  {
    name: 'Trials 3',
    side: 'white',
    mode: 'pick-square',
    squares: getRange('a1', 'd8'),
    pointsRequired: 8,
    id: 11,
  },
  {
    name: 'Trials 4',
    side: 'black',
    mode: 'pick-square',
    squares: getRange('a1', 'd8'),
    pointsRequired: 8,
    id: 12,
  },

  {
    name: 'Level 9',
    side: 'white',
    mode: 'pick-square',
    squares: getRange('e1', 'h4'),
    pointsRequired: 12,
    id: 13,
  },
  {
    name: 'Level 10',
    side: 'white',
    mode: 'pick-coords',
    squares: getRange('e1', 'h4'),
    pointsRequired: 12,
    id: 14,
  },
  {
    name: 'Level 11',
    side: 'black',
    mode: 'pick-square',
    squares: getRange('e1', 'h4'),
    pointsRequired: 13,
    id: 15,
  },
  {
    name: 'Level 12',
    side: 'black',
    mode: 'pick-coords',
    squares: getRange('e1', 'h4'),
    pointsRequired: 14,
    id: 16,
  },
  {
    name: 'Level 13',
    side: 'white',
    mode: 'pick-square',
    squares: getRange('e5', 'h8'),
    pointsRequired: 15,
    id: 17,
  },
  {
    name: 'Level 14',
    side: 'white',
    mode: 'pick-coords',
    squares: getRange('e5', 'h8'),
    pointsRequired: 16,
    id: 18,
  },
  {
    name: 'Level 15',
    side: 'black',
    mode: 'pick-square',
    squares: getRange('e5', 'h8'),
    pointsRequired: 17,
    id: 19,
  },
  {
    name: 'Level 16',
    side: 'black',
    mode: 'pick-coords',
    squares: getRange('e5', 'h8'),
    pointsRequired: 18,
    id: 20,
  },

  {
    name: 'Trials 5',
    side: 'white',
    mode: 'pick-coords',
    squares: getRange('e1', 'h8'),
    pointsRequired: 20,
    id: 21,
  },
  {
    name: 'Trials 6',
    side: 'black',
    mode: 'pick-coords',
    squares: getRange('e1', 'h8'),
    pointsRequired: 20,
    id: 22,
  },
  {
    name: 'Trials 7',
    side: 'white',
    mode: 'pick-square',
    squares: getRange('e1', 'h8'),
    pointsRequired: 20,
    id: 23,
  },
  {
    name: 'Trials 8',
    side: 'black',
    mode: 'pick-square',
    squares: getRange('e1', 'h8'),
    pointsRequired: 20,
    id: 24,
  },


  {
    name: 'Exam 1',
    side: 'white',
    mode: 'pick-coords',
    squares: getRange('a1', 'h8'),
    pointsRequired: 24,
    id: 25,
  },
  {
    name: 'Exam 2',
    side: 'black',
    mode: 'pick-coords',
    squares: getRange('a1', 'h8'),
    pointsRequired: 24,
    id: 26,
  },
  {
    name: 'Exam 3',
    side: 'white',
    mode: 'pick-square',
    squares: getRange('a1', 'h8'),
    pointsRequired: 24,
    id: 27,
  },
  {
    name: 'Exam 4',
    side: 'black',
    mode: 'pick-square',
    squares: getRange('a1', 'h8'),
    pointsRequired: 24,
    id: 28,
  },
];
