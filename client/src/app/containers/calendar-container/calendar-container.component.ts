import {Component, OnInit} from '@angular/core';
import {CalendarEvent} from 'calendar-utils';
import {CalendarEventTimesChangedEvent} from 'angular-calendar';
import {Appointment} from '../../models/model';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentDialogComponent} from '../../components/calendar/appointment-dialog/appointment-dialog.component';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss']
})
export class CalendarContainerComponent implements OnInit {
  displayedDate: Date = new Date(Date.now());
  appointments: Appointment[] = [];


  constructor(public dialog: MatDialog) {
  }

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
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '800px',
      data: $event.date
    });
  }
}
