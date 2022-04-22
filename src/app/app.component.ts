import { Component, ViewChild } from '@angular/core';
import { ChessBoard } from '../model/ChessBoard';
import { Challenge, Game, GameResult } from '../model/Game';
import { GameLevel, levels } from '../model/GameLevel';
import { failTexts, winTexts } from '../model/motivation';
import { SquareClickEvent } from './board/board.component';
import { LevelModalComponent } from './level-modal/level-modal.component';
import { ModalService } from './modal.service';
import { ProgressService } from './progress.service';
import { ResultIndicatorComponent } from './result-indicator/result-indicator.component';
import { SoundService } from './sound.service';
import { CongratsDialogComponent } from './congrats-dialog/congrats-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('indicator') indicator: ResultIndicatorComponent;
  _level: GameLevel;
  board = new ChessBoard();
  game: Game;
  challenge: Challenge;
  centerText: string;
  winText: string;
  failText: string;
  modes = {
    'pick-coords': 'Pick Coordinates',
    'pick-square': 'Find the Square',
  };

  get gameActive(): boolean {
    return this.game?.state === 'active' || false;
  }

  get level(): GameLevel {
    return this._level;
  }

  set level(v: GameLevel) {
    if (v === this._level) return;
    this._level = v;
    this.prepareLevel();
  }

  get allDone(): boolean {
    const lastLevel = levels[levels.length - 1];
    return this.ps.progress.levels[lastLevel.id]?.passed;
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

  constructor(
    private ps: ProgressService,
    private modals: ModalService,
    private ss: SoundService
  ) {
    this.level = this.ps.getCurrentLevel();
  }

  private async openFinalDialog() {
    const level = await this.modals.show(CongratsDialogComponent, {
      class: 'modal-lg',
    });
    if (level) {
      this._level = level;
    }
  }

  nextLevel() {
    this.level = this.ps.getCurrentLevel();
    this.startGame();
  }

  squareClick(ev: SquareClickEvent): void {
    if (this.game?.state !== 'active') return;
    if (this.challenge?.mode !== 'pick-square') return;
    this.processAnswer(ev.square.coords, ev.event.x, ev.event.y);
  }

  answerClick(a: string, e: MouseEvent): void {
    if (this.game?.state !== 'active') return;
    this.processAnswer(a, e.x, e.y);
  }

  private processAnswer(a: string, x: number, y: number) {
    const result = this.game.solveChallenge(this.challenge, a);
    if (result.correct) {
      this.indicator.showPositive(x, y);
      this.ss.playPositive();
    } else {
      this.indicator.showNegative(x, y);
      this.ss.playNegative();
    }
    this.challenge = result.nextChallenge;
    this.prepChallenge();
  }

  startGame(): void {
    //Prep
    const squares = this.board.squares.filter((s) =>
      this.level.squares.includes(s.coords)
    );
    this.game = new Game(squares, this.level);
    this.board.enableSquares(this.level.squares);

    let count = 3;
    this.centerText = String(3);
    const countDown = setInterval(() => {
      count--;
      this.centerText = String(count);
      if (count <= 0) {
        clearInterval(countDown);

        //The actual start
        this.challenge = this.game.start();
        this.game.completed.subscribe((r) => this.gameOver(r));
        this.board.setColor(this.level.color);
        this.prepChallenge();

        this.winText = winTexts[Math.floor(Math.random() * winTexts.length)];
        this.failText = failTexts[Math.floor(Math.random() * failTexts.length)];
        return;
      }
    }, 1000);
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

    //Todo somehow fix the issue that this will happen everytime you do the last level.
    if (r.levelId === levels[levels.length - 1].id && r.passed) {
      this.openFinalDialog();
    }
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
