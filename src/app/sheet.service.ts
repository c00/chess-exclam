import { Injectable } from '@angular/core';
import MD from 'mobile-detect';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  readonly checkAfterKey = 'installPromptCheckDate';
  showInstallPrompt = new BehaviorSubject<'ios' | 'android'>(null);
  promptEvent: any;
  checkAfter: Date = new Date();

  constructor(private store: StoreService) {
    const v = store.getItem(this.checkAfterKey);
    if (v) this.checkAfter = new Date(Number(v));
  }

  postpone() {
    const days = 1;
    const result = new Date(this.checkAfter);
    result.setDate(result.getDate() + days);

    this.checkAfter = result;
    this.store.setItem(this.checkAfterKey, +result);
  }

  public initPwaPrompt() {
    const md = new MD(window.navigator.userAgent);

    if (this.checkAfter > new Date()) return;

    if (md.is('AndroidOs')) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.showInstallPrompt.next('android');
      });
    }
    if (md.is('ios')) {
      const isInStandaloneMode =
        'standalone' in window.navigator && window.navigator['standalone'];
      if (!isInStandaloneMode) {
        this.showInstallPrompt.next('ios');
      }
    }
  }
}
