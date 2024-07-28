import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSpinnerService {
  private isSpinnerShown = false;

  constructor() {}

  show(): void {
    this.setSpinner(true);
  }

  hide(): void {
    this.setSpinner(false);
  }

  get isLoading(): boolean {
    return this.isSpinnerShown;
  }

  private setSpinner(flag: boolean): void {
    this.isSpinnerShown = flag;
  }
}
