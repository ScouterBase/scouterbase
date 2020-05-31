import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import localeCH from '@angular/common/locales/de-CH';
import { AppRoutingModule } from './app-routing.module';
import { AppContainerComponent } from './containers/app-container/app-container.component';
import { CalendarContainerComponent } from './containers/calendar-container/calendar-container.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';

registerLocaleData(localeCH);

@NgModule({
  declarations: [
    AppContainerComponent,
    CalendarContainerComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppContainerComponent]
})
export class AppModule { }
