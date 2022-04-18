import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Deferred } from '../model/Deferred';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modals: ModalStackItem[] = [];

  constructor(private ms: BsModalService) {
    ms.onHide.subscribe(() => {
      if (this._modals.length === 0) {
        console.error("I'm hiding a modal, but the stack is empty!");
      }

      const item = this._modals.pop();
      item.promise.resolve(item.modal.content.modalResult);
    });
  }

  show<T = Object>(content: any, config: ModalOptions<T> = {}): Promise<any> {
    const modal = this.ms.show<T>(content, config);
    const promise = new Deferred<any>();

    this._modals.push({ modal, promise });
    return promise.promise;
  }
}

interface ModalStackItem {
  promise: Deferred<any>;
  modal: BsModalRef;
}
