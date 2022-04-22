import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GameLevel } from '../../model/GameLevel';

@Component({
  selector: 'exclam-congrats-dialog',
  templateUrl: './congrats-dialog.component.html',
  styleUrls: ['./congrats-dialog.component.scss'],
})
export class CongratsDialogComponent {
  modalResult?: GameLevel;

  constructor(private ref: BsModalRef) {}

  close() {
    this.ref.hide();
  }

  onSelect(l: GameLevel) {
    this.modalResult = l;
    this.close();
  }
}
