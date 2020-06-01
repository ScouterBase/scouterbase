import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Appointment} from "../../../models/model";

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent {

  fromDate: string = this.data.toISOString();
  toDate = '';
  title = '';
  location = '';

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date) {
  }

  emitCreateAppointment() {
    if (this.fromDate && this.toDate && this.title) {
      const appointment: Appointment = {
        startDateTime: new Date(this.fromDate),
        endDateTime: new Date(this.toDate),
        title: this.title,
        location: this.location
      };
      this.dialogRef.close(appointment);
    } else {
      this.dialogRef.close();
    }
  }
}
