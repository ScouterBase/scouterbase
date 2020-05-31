import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from '../../models/model';
import {CalendarEvent, EventAction, EventColor} from 'calendar-utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @Input() displayedDate: Date;
  @Input() appointments: Appointment[];
  @Output() hourSegmentClicked = new EventEmitter<{ date: Date; sourceEvent: MouseEvent }>();

  emitHourSegmentClicked(event: { date: Date; sourceEvent: MouseEvent }) {
    this.hourSegmentClicked.emit(event);
  }

  mapToEvents(appointments: Appointment[]): CalendarEvent[] { // TODO: Move to helpers and test
    return appointments.map<CalendarEvent>(app => ({
      id: app.id,
      title: app.title,
      start: app.startDateTime,
      end: app.endDateTime
    }));
  }
}
