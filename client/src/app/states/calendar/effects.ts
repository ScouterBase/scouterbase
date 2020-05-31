import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {loadAppointmentsInitial, loadAppointmentsInitialSuccess} from './actions';
import {CalendarService} from '../../services/calendar.service';

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

  constructor(private actions$: Actions, private calendarService: CalendarService) {
  }

}
