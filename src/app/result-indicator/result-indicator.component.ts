import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'exclam-result-indicator',
  templateUrl: './result-indicator.component.html',
  styleUrls: ['./result-indicator.component.scss'],
  animations: [
    trigger('fly', [
      transition(':enter', [style({ transform: 'translateY(0)', opacity: 2 })]),
      transition(':leave', [
        animate('400ms', style({ transform: 'translateY(-200%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ResultIndicatorComponent {
  show: 'positive' | 'negative' | 'hidden' = 'hidden';

  x: number;
  y: number;

  showPositive(x: number, y: number) {
    this.x = x - 15;
    this.y = y - 15;
    this.show = 'positive';
    this.startTime();
  }

  showNegative(x: number, y: number) {
    this.x = x - 15;
    this.y = y - 25;
    this.show = 'negative';
    this.startTime();
  }

  private startTime() {
    setTimeout(() => {
      this.show = 'hidden';
    }, 1);
  }
}
