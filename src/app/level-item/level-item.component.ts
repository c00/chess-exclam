import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameLevel } from '../../model/GameLevel';
import { GameResult } from '../../model/Game';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'exclam-level-item',
  templateUrl: './level-item.component.html',
  styleUrls: ['./level-item.component.scss'],
})
export class LevelItemComponent implements OnInit {
  @Input() level: GameLevel;
  @Input() progress: GameResult;
  @Output() selectLevel = new EventEmitter<GameLevel>();

  state: 'locked' | 'unlocked' | 'completed' = 'locked';

  get unlocked(): boolean {
    return this.ps.progress.points >= this.level.pointsRequired;
  }

  constructor(private ps: ProgressService) {}

  ngOnInit(): void {
    if (this.progress?.passed) {
      this.state = 'completed'
    } else if (this.unlocked) {
      this.state = 'unlocked';
    }
  }
}
