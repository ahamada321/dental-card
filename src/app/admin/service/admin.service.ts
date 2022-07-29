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

  public getTeachers(): Observable<any> {
    return this.http.get('/api/v1/users');
  }

  public deleteTeacher(teacherId: string): Observable<any> {
    return this.http.delete('/api/v1/users/' + teacherId);
  }

  public deleteStudent(studentId: string): Observable<any> {
    return this.http.delete('/api/v1/rentals/' + studentId);
  }

  public getTeachersByPages(
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(`/api/v1/users?page=${pageIndex}&limit=${pageSize}`);
  }

  public getTeachersByKeywords(searchWords?: string): Observable<any> {
    return this.http.get('/api/v1/users/search/' + searchWords);
  }

  public getTeacherById(teacherId: string): Observable<any> {
    return this.http.get('/api/v1/users/' + teacherId);
  }
}
