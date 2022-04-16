import { GameResult } from './Game';

export interface GameProgress {
  levels: Record<number, GameResult>;
  points: number;
  name?: string
}