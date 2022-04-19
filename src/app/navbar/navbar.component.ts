import { Component } from '@angular/core';
import { InstructionsModalComponent } from '../instructions-modal/instructions-modal.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'exclam-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private modals: ModalService) {}

  showInstructions() {
    this.modals.show(InstructionsModalComponent, { class: 'modal-lg' });
  }
}
