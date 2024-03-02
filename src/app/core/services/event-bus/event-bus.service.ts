import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';

export type EventBusEvent = {
  name: string;
  data: any;
};

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventBus = new Subject<EventBusEvent>();

  constructor() {}

  publish(event: EventBusEvent): void {
    this.eventBus.next(event);
  }

  register(eventName: string): Observable<EventBusEvent> {
    return this.eventBus
      .asObservable()
      .pipe(filter((event: EventBusEvent) => event.name === eventName));
  }
}
