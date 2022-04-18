export class Deferred<T> {
  promise: Promise<T>

  private _finished = false;
  get finished() {
    return this._finished;
  }

  private _resolve: Function;
  private _reject: Function;

  constructor() {
    this.promise = new Promise<T>((res, rej) => {
      this._resolve = res;
      this._reject = rej;
    });
  }

  resolve(value: T) {
    if (this._finished) throw "Promise already finished";

    this._finished = true;
    this._resolve(value);
  }

  reject(value: T) {
    if (this._finished) throw "Promise already finished";
    
    this._finished = true;
    this._reject(value);
  }
}