import {createAction, props} from '@ngrx/store';
import {Appointment} from '../../models/model';

export const loadAppointmentsInitial = createAction(
  '[Calendar] Initial Load all appointments from API'
);

export const loadAppointmentsInitialSuccess = createAction(
  '[Calendar] Successfully initially loaded all appointments from API',
  props<{ appointments: Appointment[] }>()
);

export const createAppointment = createAction(
  '[Calendar] Create a new appointment',
  props<{ appointment: Appointment }>()
);

export const createAppointmentSuccess = createAction(
  '[Calendar] Created successfully a new appointment',
  props<{ appointment: Appointment }>()
);
