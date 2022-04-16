import { Component, EventEmitter, Output } from '@angular/core';
import { GameLevel, levels } from '../../model/GameLevel';

@Component({
  selector: 'exclam-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {
  @Output() selectLevel = new EventEmitter<GameLevel>();
  list: GameLevel[];

  constructor() {
    //todo load saved data
    this.list = [...levels];
  }

  select(l: GameLevel): void {
    this.selectLevel.emit(l);
  }
}
