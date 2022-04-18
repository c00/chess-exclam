import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameLevel, levels } from '../../model/GameLevel';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'exclam-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {
  @Output() selectLevel = new EventEmitter<GameLevel>();
  @Input() disabled = false;
  @Input() current: GameLevel;

  list: GameLevel[];
  open: GameLevel[] = [];

  get myPoints(): number {
    return this.ps.progress.points;
  }

  constructor(private ps: ProgressService) {
    this.list = levels;
    this.setOpen();

    ps.onProgess.subscribe((p) => this.setOpen());
  }

  private setOpen() {
    this.open = this.list.filter(
      (l) =>
        l.pointsRequired <= this.myPoints &&
        !this.ps.progress.levels[l.id]?.passed
    );
  }

  select(l: GameLevel): void {
    this.selectLevel.emit(l);
  }
}
