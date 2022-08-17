import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Rental } from './rental.model'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClinicService {
  constructor(private http: HttpClient) {}

  public getAllReports(): Observable<any> {
    return this.http.get('/api/v1/reports');
  }

  public getMyStudents(): Observable<any> {
    return this.http.get('/api/v1/rentals/manage');
  }

  public getUserRevenue(selectedId: number): Observable<any> {
    return this.http.get('/api/v1/payments/user/' + selectedId);
  }

  public getRentalById(rentalId: string): Observable<any> {
    return this.http.get('/api/v1/rentals/' + rentalId);
  }

  public createReport(reportData: any): Observable<any> {
    return this.http.post('/api/v1/bookings', reportData);
  }

  // public createReport(rentalData: any): Observable<any> {
  //   return this.http.post('/api/v1/rentals', rentalData)
  // }

  // public deleteRental(rentalId: string): Observable<any> {
  //     return this.http.delete('/api/v1/rentals/' + rentalId)
  // }
}
