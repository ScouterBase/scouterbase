import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarContainerComponent} from './container/calendar-container/calendar-container.component';


const routes: Routes = [
  {path: 'calendar', component: CalendarContainerComponent},
  {
    path: '',
    redirectTo: '/calendar',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: '/calendar'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
