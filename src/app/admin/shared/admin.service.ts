import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  public getReports(selectedId: any): Observable<any> {
    return this.http.get('/api/v1/bookings/' + selectedId);
  }

  public deleteReport(selectedId: any): Observable<any> {
    return this.http.delete('/api/v1/bookings/' + selectedId);
  }

  public getStudentsByPages(
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(`/api/v1/rentals?page=${pageIndex}&limit=${pageSize}`);
  }

  public getStudentsByKeywords(searchWords?: string): Observable<any> {
    return this.http.get('/api/v1/rentals/search/' + searchWords);
  }

  public getStudentById(studentId: string): Observable<any> {
    return this.http.get('/api/v1/rentals/' + studentId);
  }

  public deleteStudent(studentId: string): Observable<any> {
    return this.http.delete('/api/v1/rentals/' + studentId);
  }

  public getUsers(): Observable<any> {
    return this.http.get('/api/v1/users');
  }

  public getUserById(userId: string): Observable<any> {
    return this.http.get('/api/v1/users/' + userId);
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/v1/users/' + userId);
  }

  public getUsersByPages(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(`/api/v1/users?page=${pageIndex}&limit=${pageSize}`);
  }

  public getUsersByKeywords(searchWords?: string): Observable<any> {
    return this.http.get('/api/v1/users/search/' + searchWords);
  }
}
