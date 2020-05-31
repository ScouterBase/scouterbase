import {GlobalState} from '../state';
import {createSelector} from '@ngrx/store';
import {Appointment} from '../../models/model';
import {mapToList} from '../../helpers/helpers';

export const selectAllAppointments = (state: GlobalState) => state.calendar.appointments;

export const selectAppointments = createSelector(
  selectAllAppointments,
  (appointments: Record<string, Appointment>): Appointment[] => {
    return mapToList(appointments);
  }
);
