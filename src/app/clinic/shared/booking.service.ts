import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookingService {
  constructor(private http: HttpClient) {}

  public createBooking(bookingData: Booking): Observable<any> {
    return this.http.post('/api/v1/bookings', bookingData);
  }

  public getBookingById(bookingId: string): Observable<any> {
    return this.http.get('/api/v1/bookings/' + bookingId);
  }

  public getUserBookings(): Observable<any> {
    return this.http.get('/api/v1/bookings');
  }

  public updateBooking(bookingData: Booking): Observable<any> {
    return this.http.patch('/api/v1/bookings', bookingData);
  }

  public deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete('/api/v1/bookings/' + bookingId);
  }

  public createDateBlockBooking(bookingData: Booking): Observable<any> {
    return this.http.post('/api/v1/bookings/block', bookingData);
  }
}
