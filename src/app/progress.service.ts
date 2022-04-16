import { Injectable } from '@angular/core';
import { GameProgress } from '../model/GameProgress';
import { StoreService } from './store.service';
import { GameResult } from '../model/Game';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  progress: GameProgress;

  constructor(private store: StoreService) {
    this.progress = store.getItem<GameProgress>('progress');
    if (!this.progress) {
      this.progress = {
        levels: {},
        points: 0,
      };
    }
  }

  gameComplete(gr: GameResult) {
    console.log('Game Completed', gr);
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
  }
}
