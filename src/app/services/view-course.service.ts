import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class ViewCourseService {
  constructor(private http: HttpClient) {}
  courseurl: string =
    'https://localhost:44322/api/Courses/ViewCoursesByDepartment';
  getCourse(query: number): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.courseurl + `?departmentId=${query}`
    );
  }
}
