import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  static PREFIX = 'exclam_';

  constructor() {}

  getItem<T>(key: string): T {
    const value = localStorage.getItem(StoreService.PREFIX + key);
    if (!value === null) return null;

    return this.tryParse(value);
  }

  setItem<T>(key: string, object: T): void {
    const json = JSON.stringify(object);
    localStorage.setItem(StoreService.PREFIX + key, json);
  }

  removeItem(key: string): void {
    localStorage.removeItem(StoreService.PREFIX + key);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tryParse(data: string): any {
    try {
      return JSON.parse(data);
    } catch (err) {
      return data;
    }
  }
}
