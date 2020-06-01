import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {
  createAppointment,
  createAppointmentSuccess,
  loadAppointmentsInitial,
  loadAppointmentsInitialSuccess
} from './actions';
import {CalendarService} from '../../services/calendar.service';
import {Appointment} from "../../models/model";
import {EMPTY} from "rxjs";

@Injectable()
export class CalendarEffects {

  loadAppointments$ = createEffect(() => this.actions$.pipe(
    ofType(loadAppointmentsInitial),
    mergeMap(() => this.calendarService.getAllAppointments()
      .pipe(
        map(appointments => loadAppointmentsInitialSuccess({appointments})),
      )
    )
  ));

  createAppointment$ = createEffect(() => this.actions$.pipe(
    ofType(createAppointment),
    mergeMap((action) => this.calendarService.createAppointment(action.appointment)
      .pipe(
        map((appointment: Appointment) => createAppointmentSuccess({appointment})),
        catchError(() => EMPTY)
      )
    )
  ));

  constructor(private actions$: Actions, private calendarService: CalendarService) {
  }

}
