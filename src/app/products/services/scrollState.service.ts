import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollStateService {
  private scrollState = new Map<string, number>();

  setScrollState(state: number) {
    this.scrollState.set('scroll', state);
  }

  get scrollStateValue(){
    return this.scrollState.get('scroll');
  }
}
