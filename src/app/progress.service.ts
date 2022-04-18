import { Injectable } from '@angular/core';
import { GameProgress } from '../model/GameProgress';
import { StoreService } from './store.service';
import { GameResult } from '../model/Game';
import { levels, GameLevel } from '../model/GameLevel';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  progress: GameProgress;
  onProgess = new Subject<GameProgress>();

  constructor(private store: StoreService) {
    this.progress = store.getItem<GameProgress>('progress');
    if (!this.progress) {
      this.progress = {
        levels: {},
        points: 0,
      };
    }
    this.onProgess.next(this.progress);
  }

  getCurrentLevel(): GameLevel {
    const current = levels.find((l) => !this.progress.levels[l.id]);
    if (current) return current;
    return levels[levels.length - 1];
  }

  gameComplete(gr: GameResult) {
    if (!gr.levelId || !gr.passed) return;
    const current = this.progress.levels[gr.levelId];
    if (!current) {
      this.progress.levels[gr.levelId] = gr;
    } else if (gr.score > current.score) {
      this.progress.levels[gr.levelId] = gr;
    }
    //Else score was better, so we keep the old one.
    this.updateProgress(this.progress);
  }

  updateProgress(p: GameProgress) {
    p.points = 0;
    for (const l of Object.values(p.levels)) {
      if (l.passed) p.points++;
    }
    this.progress = p;
    this.store.setItem('progress', p);
    this.onProgess.next(this.progress);
  }
}
