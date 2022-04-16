import { Component } from '@angular/core';
import { ChessSquare } from '../model/ChessSquare';
import { ChessBoard } from '../model/ChessBoard';
import { Game, Challenge } from '../model/Game';
import { GameLevel } from '../model/GameLevel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  level: GameLevel;
  board = new ChessBoard();
  game: Game;
  challenge: Challenge;
  centerText: string;

  constructor() {}

  squareClick(e: ChessSquare): void {
    if (this.game?.state !== 'active') return;
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
    const squares = this.board.squares.filter(s => this.level.squares.includes(s.coords));
    this.game = new Game(squares, this.level.mode, this.level.opts);
    this.board.enableSquares(this.level.squares);
    this.challenge = this.game.start();
    this.board.setColor(this.level.side);
    this.prepChallenge();
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
