import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import localeCH from '@angular/common/locales/de-CH';
import {AppRoutingModule} from './app-routing.module';
import {AppContainerComponent} from './containers/app-container/app-container.component';
import {CalendarContainerComponent} from './containers/calendar-container/calendar-container.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import {CalendarComponent} from './components/calendar/calendar/calendar.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {reducers} from './states/reducers';
import {effects} from './states/effects';
import {HttpClientModule} from '@angular/common/http';
import {AppointmentDialogComponent} from './components/calendar/appointment-dialog/appointment-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';

registerLocaleData(localeCH);

@NgModule({
  declarations: [
    AppContainerComponent,
    CalendarContainerComponent,
    CalendarComponent,
    AppointmentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppContainerComponent]
})
export class AppModule { }
