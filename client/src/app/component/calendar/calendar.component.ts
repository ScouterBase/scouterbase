import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarEvent} from 'calendar-utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @Input() displayedDate: Date;
  @Input() events: CalendarEvent[];
  @Output() hourSegmentClicked = new EventEmitter<{ date: Date; sourceEvent: MouseEvent }>();

  emitHourSegmentClicked(event: { date: Date; sourceEvent: MouseEvent }) {
    this.hourSegmentClicked.emit(event);
  }
}
