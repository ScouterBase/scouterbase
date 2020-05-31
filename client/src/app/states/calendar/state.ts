import {Appointment} from '../../models/model';

export interface CalendarState {
  readonly initialized: boolean;
  readonly loading: boolean;
  readonly appointments: Record<string, Appointment>;
}

export const initialCalendarState: CalendarState = {
  initialized: false,
  loading: false,
  appointments: {}
};
