import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SheetService } from '../sheet.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'exclam-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SheetComponent implements OnInit {
  isShown = false;
  currentOs: 'ios' | 'android';
  

  constructor(private ss: SheetService) {}

  ngOnInit() {
    this.ss.showInstallPrompt.pipe(filter((v) => v !== null)).subscribe((v) => {
      this.currentOs = v;
      this.show();
    });
  }

  postpone() {
    this.ss.postpone();
    this.isShown = false;
  }

  installPwa() {
    this.ss.promptEvent?.prompt();
    this.isShown = false;
  }

  private show() {
    this.isShown = true;
    setTimeout(() => {
      // this.isShown = false;
    }, 10000);
  }
}
