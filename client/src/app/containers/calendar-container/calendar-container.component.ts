import {Component, OnInit} from '@angular/core';
import {Appointment} from '../../models/model';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentDialogComponent} from '../../components/calendar/appointment-dialog/appointment-dialog.component';
import {Store} from '@ngrx/store';
import {GlobalState} from '../../states/state';
import {Observable} from 'rxjs';
import {selectAppointments} from '../../states/calendar/selectors';
import {createAppointment} from "../../states/calendar/actions";

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
    this.appointments = this.store.select(selectAppointments);
    this.loading = this.store.select(state => state.calendar.loading);
    this.initialized = this.store.select(state => state.calendar.initialized);
  }

  handleHourEvent($event: { date: Date; sourceEvent: MouseEvent }) {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '800px',
      data: $event.date
    });

    dialogRef.afterClosed().subscribe((appointment: Appointment | undefined) => {
        if (appointment) {
          console.log(appointment);
          this.store.dispatch(createAppointment({appointment}));
        }
      }
    );
  }
}
