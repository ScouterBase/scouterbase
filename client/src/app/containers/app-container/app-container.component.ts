import {Component, OnInit} from '@angular/core';
import {GlobalState} from '../../states/state';
import {Store} from '@ngrx/store';
import {loadAppointmentsInitial} from '../../states/calendar/actions';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {

  constructor(private store: Store<GlobalState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadAppointmentsInitial());
  }

}
