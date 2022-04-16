import { BehaviorSubject, Subject } from 'rxjs';
import { ChessSquare } from './ChessSquare';
import { shuffleArray } from './shuffle';

export class Game {
  onTick = new BehaviorSubject<number>(0);

  get result(): GameResult {
    return this._result;
  }

  get squares(): ChessSquare[] {
    return this._squares;
  }

  get score(): number {
    return this._score;
  }

  get mistakes(): number {
    return this._mistakes;
  }

  get state(): GameState {
    return this._state;
  }

  get mode(): GameMode {
    return this._mode;
  }

  get secondsLeft(): number {
    return this._secondsLeft;
  }

  private _result: GameResult;
  private opts: GameOptions;
  private _secondsLeft: number;
  private _score = 0;
  private _mistakes = 0;
  private _state: GameState = 'not-started';
  private timer: ReturnType<typeof setTimeout>;

  constructor(
    private _squares: ChessSquare[],
    private _mode: GameMode,
    opts?: Partial<GameOptions>
  ) {
    if (!opts) opts = {};
    this.opts = Object.assign({}, opts, defaultGameOpts);
  }

  start(): Challenge {
    if (this._state !== 'not-started')
      throw 'Cannot start Game. State incorrect.';
    this._state = 'active';
    this._secondsLeft = this.opts.seconds;
    this.timer = setInterval(() => this.tick(), 1000);

    this.onTick.next(this._secondsLeft);

    return this.getChallenge();
  }

  solveChallenge(c: Challenge, answer: string): ChallengeResult {
    if (this._state !== 'active') throw 'Game not active.';

    if (c.answer === answer) {
      this._score++;
      return { correct: true, nextChallenge: this.getChallenge() };
    } else {
      this._mistakes++;
      return { correct: false, nextChallenge: c };
    }
  }

  stop() {
    if (this._state !== 'active') return;
    this._state = 'stopped';
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private getChallenge(): Challenge {
    const c: Challenge = {
      mode: this.mode,
      answer: this.getRandomSquare().coords,
    };

    if (c.mode === 'pick-coords') {
      c.options = [c.answer];

      //Generate (wrong) answers
      let idiocy = 0;
      while (c.options.length < 4) {
        idiocy++;
        if (idiocy > 1000) throw 'Great job, you broke it.';

        const sq = this.getRandomSquare();
        if (c.options.indexOf(sq.coords) === -1) c.options.push(sq.coords);
      }

      c.options = shuffleArray(c.options);
    }

    return c;
  }

  private getRandomSquare(): ChessSquare {
    const index = Math.floor(Math.random() * this.squares.length);
    return this.squares[index];
  }

  private tick() {
    if (this._secondsLeft <= 0) {
      //Finalize
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = undefined;
      }

      this._secondsLeft = 0;
      let state: GameState = 'passed';
      if (this.mistakes > this.opts.maxMistakes) state = 'failed';
      if (this.score < this.opts.target) state = 'failed';
      this._state = state;
      this._result = {
        passed: state === 'passed',
        score: this.score,
        mistakes: this.mistakes,
      };
      this.onTick.next(this._secondsLeft);
      return;
    }
    this._secondsLeft--;
    this.onTick.next(this._secondsLeft);
  }
}

export type GameMode = 'pick-square' | 'pick-coords';
export type GameState =
  | 'not-started'
  | 'active'
  | 'failed'
  | 'passed'
  | 'stopped';

export interface GameOptions {
  seconds: number;
  target: number;
  maxMistakes: number;
}

const defaultGameOpts: GameOptions = {
  seconds: 30,
  target: 20,
  maxMistakes: 1,
};

export interface Challenge {
  answer: string;
  mode: GameMode;
  options?: string[];
}

export interface ChallengeResult {
  correct: boolean;
  nextChallenge: Challenge;
}

export interface GameResult {
  score: number;
  mistakes: number;
  passed: boolean;
}