import {Action, createReducer, on} from '@ngrx/store';
import {CalendarState, initialCalendarState} from './state';
import {loadAppointmentsInitial, loadAppointmentsInitialSuccess} from './actions';
import {listToMap} from '../../helpers/helpers';

const reducer = createReducer(
  initialCalendarState,
  on(loadAppointmentsInitial, (state => ({...state, loading: true}))),
  on(loadAppointmentsInitialSuccess, (state, {appointments}) => ({
    ...state,
    loading: false,
    initialized: true,
    appointments: listToMap(appointments, 'id')
  }))
);

export function calendarReducer(state: CalendarState | undefined, action: Action) {
  return reducer(state, action);
}
