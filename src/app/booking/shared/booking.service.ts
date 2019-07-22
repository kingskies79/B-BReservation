import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  booking: any;
  apiUrl = 'http://localhost:3002/api/v1/bookings/';
  constructor(private http: HttpClient) { }

  getUserBookings(): Observable<any> {
    return this.http.get(this.apiUrl + 'manage');

  }
  createBooking(booking: Booking): Observable<any> {
    return this.http.post(this.apiUrl, booking);
  }
}
