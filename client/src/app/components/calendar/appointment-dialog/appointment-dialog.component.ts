import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Appointment} from '../../../models/model';
import {dateToStringWithoutTimezone} from '../../../helpers/helpers';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentDialogComponent {

  fromDate: Date = this.data;
  toDate: Date = this.addHalfHourToDate(this.data);
  title = '';
  location = '';

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date) {
  }

  addHalfHourToDate(date: Date) { // TODO: Move to helpers or solve in a good way
    const addedDate = new Date(date);
    addedDate.setTime(addedDate.getTime() + 30 * 60 * 1000); // min * sec * milisec
    return addedDate;
  }

  emitCreateAppointment() {
    if (this.fromDate && this.toDate && this.title) {
      const appointment: Appointment = {
        startDateTime: dateToStringWithoutTimezone(this.fromDate),
        endDateTime: dateToStringWithoutTimezone(this.toDate),
        title: this.title,
        location: this.location,
        id: undefined
      };
      this.dialogRef.close(appointment);
    } else {
      this.dialogRef.close();
    }
  }
}

