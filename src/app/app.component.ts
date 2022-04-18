import { Component } from '@angular/core';
import { ChessSquare } from '../model/ChessSquare';
import { ChessBoard } from '../model/ChessBoard';
import { Game, Challenge, GameResult } from '../model/Game';
import { GameLevel } from '../model/GameLevel';
import { ProgressService } from './progress.service';
import { ModalService } from './modal.service';
import { LevelModalComponent } from './level-modal/level-modal.component';
import { winTexts, failTexts } from '../model/motivation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  _level: GameLevel;
  board = new ChessBoard();
  game: Game;
  challenge: Challenge;
  centerText: string;
  winText: string;
  failText: string;

  get level(): GameLevel {
    return this._level;
  }

  set level(v: GameLevel) {
    if (v === this._level) return;
    this._level = v;
    this.prepareLevel();
  }

  get title(): string {
    return this.level.name || 'Welcome!';
  }

  get subtitle(): string {
    return this.level.section || "Let's get started";
  }

  get percentage(): number {
    if (!this.game || this.game.state !== 'active') return 0;
    return 100 - (this.game.secondsLeft / this.game.startingSeconds) * 100;
  }

  constructor(private ps: ProgressService, private modals: ModalService) {
    this.level = this.ps.getCurrentLevel();
  }

  nextLevel() {
    this.level = this.ps.getCurrentLevel();
    this.startGame();
  }

  squareClick(e: ChessSquare): void {
    if (this.game?.state !== 'active') return;
    if (this.challenge?.mode !== 'pick-square') return;
    const result = this.game.solveChallenge(this.challenge, e.coords);
    this.challenge = result.nextChallenge;
    this.prepChallenge();
  }

  answerClick(a: string): void {
    if (this.game?.state !== 'active') return;
    const result = this.game.solveChallenge(this.challenge, a);
    this.challenge = result.nextChallenge;
    this.prepChallenge();
  }

  startGame(): void {
    const squares = this.board.squares.filter((s) =>
      this.level.squares.includes(s.coords)
    );
    this.game = new Game(squares, this.level);
    this.board.enableSquares(this.level.squares);
    this.challenge = this.game.start();
    this.game.completed.subscribe((r) => this.gameOver(r));

    this.board.setColor(this.level.color);
    this.prepChallenge();

    this.winText = winTexts[Math.floor(Math.random() * winTexts.length)];
    this.failText = failTexts[Math.floor(Math.random() * failTexts.length)];
  }

  async openLevelModal() {
    const level = await this.modals.show(LevelModalComponent, {
      class: 'modal-lg',
    });
    if (!level) return;
    this.level = level;
  }

  private prepareLevel() {
    this.board.setColor(this.level.color);
    this.board.enableSquares(this.level.squares);
    this.board.highlightSquare('xx');
  }

  private gameOver(r: GameResult) {
    this.ps.gameComplete(r);
    this.challenge = null;
  }

  private prepChallenge(): void {
    if (this.challenge.mode === 'pick-square') {
      this.centerText = this.challenge.answer;
      this.board.highlightSquare('xx');
    } else {
      this.centerText = null;
      this.board.highlightSquare(this.challenge.answer);
    }
  }
}
