import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../states/state';
import { Store } from '@ngrx/store';
import { loadAppointmentsInitial } from '../../states/calendar/actions';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {

  constructor(private store: Store<GlobalState>,
              private keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadAppointmentsInitial());
    this.keycloakService.loadUserProfile().then(profile => console.log(profile));
    console.log((this.keycloakService.getKeycloakInstance().idTokenParsed as any).groups);
  }

  logout() {
    this.keycloakService.logout();
  }
}
