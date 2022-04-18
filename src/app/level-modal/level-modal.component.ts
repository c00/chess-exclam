import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GameResult } from '../../model/Game';
import { GameLevel, levels } from '../../model/GameLevel';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'exclam-level-modal',
  templateUrl: './level-modal.component.html',
  styleUrls: ['./level-modal.component.scss'],
})
export class LevelModalComponent {
  modalResult?: GameLevel;
  sections: GameSection[];

  confirmReset = false;

  get progress(): Record<string, GameResult> {
    return this.ps.progress.levels;
  }

  get points(): number {
    return this.ps.progress.points;
  }

  get name(): string {
    return this.ps.progress.name || 'there';
  }

  constructor(private ref: BsModalRef, private ps: ProgressService) {
    //Setup Sections
    this.sections = [];
    for (const l of levels) {
      const s = this.sections.find((s) => s.name === l.section);
      if (!s) {
        const s: GameSection = { name: l.section, levels: [l] };
        this.sections.push(s);
      } else {
        s.levels.push(l);
      }
    }
  }

  resetProgress() {
    const p = this.ps.progress;
    p.points = 0;
    p.levels = {};
    this.ps.updateProgress(p);
    this.confirmReset = false;
  }

  selectLevel(l: GameLevel) {
    this.modalResult = l;
    this.close();
  }

  close() {
    this.ref.hide();
  }
}

interface GameSection {
  name: string;
  levels: GameLevel[];
}
