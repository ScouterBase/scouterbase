import { Component, OnInit } from '@angular/core';
import {CalendarEvent} from 'calendar-utils';
import {CalendarEventTimesChangedEvent} from 'angular-calendar';
import {Appointment} from '../../models/model';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss']
})
export class CalendarContainerComponent implements OnInit {
  displayedDate: Date = new Date(Date.now());
  appointments: Appointment[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(clicked: string, event: CalendarEvent<any>) {
    console.log(clicked);
    console.log(event);
  }

  eventTimesChanged($event: CalendarEventTimesChangedEvent<any>) {
    console.log($event);
  }

  handleHourEvent($event: { date: Date; sourceEvent: MouseEvent }) {
    console.log($event);
  }
}
