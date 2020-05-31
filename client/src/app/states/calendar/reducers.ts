import {Action, createReducer, on} from '@ngrx/store';
import {CalendarState, initialCalendarState} from './state';
import {loadAppointmentsInitial, loadAppointmentsInitialSuccess} from './actions';
import {Appointment} from '../../models/model';

const reducer = createReducer(
  initialCalendarState,
  on(loadAppointmentsInitial, (state => ({...state, loading: true}))),
  on(loadAppointmentsInitialSuccess, (state, {appointments}) => ({
    ...state,
    loading: false,
    initialized: true,
    appointments: listToMap(appointments)
  }))
);

export function calendarReducer(state: CalendarState | undefined, action: Action) {
  return reducer(state, action);
}

export function listToMap(list: Appointment[]): Record<string, Appointment> { // TODO: Make generic and move to helpers
  return list.reduce((o: Record<string, Appointment>, appointment) => {
    o[appointment.id.toString()] = appointment;
    return o;
  }, {});
}
