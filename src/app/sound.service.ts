import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private _soundEnabled = true;

  private positiveSound = new Audio('assets/audio/positive.wav');
  private negativeSound = new Audio('assets/audio/negative.wav');

  get soundEnabled(): boolean {
    return this._soundEnabled;
  }
  constructor(private store: StoreService) {
    const val = this.store.getItem<boolean>('soundEnabled');
    if (val !== null && val !== undefined) {
      this._soundEnabled = val;
    }
    this.negativeSound.load();
    this.positiveSound.load();
  }

  toggleSound() {
    this._soundEnabled = !this._soundEnabled;
    this.store.setItem('soundEnabled', this._soundEnabled);
  }

  playPositive() {
    if (!this._soundEnabled) return;
    const clone = this.positiveSound.cloneNode(true) as HTMLAudioElement;
    clone.play();
  }

  playNegative() {
    if (!this._soundEnabled) return;
    const clone = this.negativeSound.cloneNode(true) as HTMLAudioElement;
    clone.play();
  }
}
