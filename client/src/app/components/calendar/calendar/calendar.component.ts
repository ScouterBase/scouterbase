import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from '../../../models/model';
import {CalendarEvent} from 'calendar-utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @Input() displayedDate: Date;
  @Input() appointments: Appointment[];
  @Input() loading: boolean;
  @Input() initialized: boolean;

  @Output() hourSegmentClicked = new EventEmitter<{ date: Date; sourceEvent: MouseEvent }>();

  emitHourSegmentClicked(event: { date: Date; sourceEvent: MouseEvent }) {
    this.hourSegmentClicked.emit(event);
  }

  mapToEvents(appointments: Appointment[]): CalendarEvent[] { // TODO: Move to helpers and test & this gets called very often?
    return appointments.map<CalendarEvent>(app => ({
      id: app.id,
      title: app.title,
      start: new Date(app.startDateTime),
      end: new Date(app.endDateTime)
    }));
  }
}
