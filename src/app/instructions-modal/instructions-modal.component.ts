import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'exclam-instructions-modal',
  templateUrl: './instructions-modal.component.html',
  styleUrls: ['./instructions-modal.component.scss'],
})
export class InstructionsModalComponent {
  constructor(private ref: BsModalRef) {}

  close() {
    this.ref.hide();
  }
}
