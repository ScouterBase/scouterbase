import {Component, OnInit} from '@angular/core';
import {CalendarEvent} from 'calendar-utils';
import {CalendarEventTimesChangedEvent} from 'angular-calendar';
import {Appointment} from '../../models/model';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentDialogComponent} from '../../components/calendar/appointment-dialog/appointment-dialog.component';
import {select, Store} from '@ngrx/store';
import {GlobalState} from '../../states/state';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss']
})
export class CalendarContainerComponent implements OnInit {

  displayedDate: Date = new Date(Date.now());
  appointments: Observable<Appointment[]>;
  loading: Observable<boolean>;
  initialized: Observable<boolean>;

  constructor(private store: Store<GlobalState>, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.appointments = this.store.pipe(
      select(state => state.calendar.appointments),
      map(appointment => Object.keys(appointment).map(key => appointment[key])),
    );

    this.loading = this.store.select(state => state.calendar.loading);
    this.initialized = this.store.select(state => state.calendar.initialized);
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
