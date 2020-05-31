import {ActionReducerMap} from '@ngrx/store';
import {GlobalState} from './state';
import {calendarReducer} from './calendar/reducers';

export const reducers: ActionReducerMap<GlobalState> = {
  calendar: calendarReducer
};
