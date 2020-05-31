import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Appointment} from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseUrl = '/appointments';

  constructor(private http: HttpClient) {
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(environment.restEndpoint + this.baseUrl);
  }
}
