import { ChessColor } from './ChessBoard';
import { GameMode, GameOptions, GameResult } from './Game';

export interface GameLevel {
  name: string,
  side: ChessColor;
  squares: string[];
  mode: GameMode;
  opts?: GameOptions;

  results?: GameResult[];
  bestResult?: GameResult;
}

export const levels: GameLevel[] = [
  { 
    name: 'Level 1',
    side: 'white', 
    mode: 'pick-square' ,
    squares: [
      'a4', 'b4', 'c4', 'd4',
      'a3', 'b3', 'c3', 'd3',
      'a2', 'b2', 'c2', 'd2',
      'a1', 'b1', 'c1', 'd1',
    ], 
  },
  { 
    name: 'Level 2',
    side: 'white', 
    mode: 'pick-coords' ,
    squares: [
      'a4', 'b4', 'c4', 'd4',
      'a3', 'b3', 'c3', 'd3',
      'a2', 'b2', 'c2', 'd2',
      'a1', 'b1', 'c1', 'd1',
    ], 
  },
  { 
    name: 'Level 3',
    side: 'black', 
    mode: 'pick-square' ,
    squares: [
      'a4', 'b4', 'c4', 'd4',
      'a3', 'b3', 'c3', 'd3',
      'a2', 'b2', 'c2', 'd2',
      'a1', 'b1', 'c1', 'd1',
    ], 
  },
  { 
    name: 'Level 4',
    side: 'black', 
    mode: 'pick-coords' ,
    squares: [
      'a4', 'b4', 'c4', 'd4',
      'a3', 'b3', 'c3', 'd3',
      'a2', 'b2', 'c2', 'd2',
      'a1', 'b1', 'c1', 'd1',
    ], 
  }
];