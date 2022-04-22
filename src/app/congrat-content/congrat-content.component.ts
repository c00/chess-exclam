import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameResult } from '../../model/Game';
import { GameLevel, levels } from '../../model/GameLevel';
import { GameProgress } from '../../model/GameProgress';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'exclam-congrat-content',
  templateUrl: './congrat-content.component.html',
  styleUrls: ['./congrat-content.component.scss'],
})
export class CongratContentComponent {
  @Output() selectLevel = new EventEmitter<GameLevel>();

  levels = levels.slice(levels.length - 4);
  score: number;

  get progress(): Record<string, GameResult> {
    return this.ps.progress.levels;
  }

  constructor(private ps: ProgressService) {
    this.calcScore(this.ps.progress);
    this.ps.onProgess.subscribe((p) => {
      this.calcScore(p)
    });
  }

  private calcScore(p: GameProgress) {
    //Calculate total score
    this.score = 0;
    for (const l of Object.values(p.levels)) {
      this.score += l.score;
    }
  }
}
