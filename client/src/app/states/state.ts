import {CalendarState, initialCalendarState} from './calendar/state';

export interface GlobalState {
  readonly calendar: CalendarState;
}

export const initialGlobalState = {
  calendar: initialCalendarState
};
