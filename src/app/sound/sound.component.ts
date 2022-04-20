import { Component, OnInit } from '@angular/core';
import { SoundService } from '../sound.service';

@Component({
  selector: 'exclam-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss'],
})
export class SoundComponent {
  constructor(public ss: SoundService) {}
}
