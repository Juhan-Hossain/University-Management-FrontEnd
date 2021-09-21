import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class ViewCourseService {
  constructor(private http: HttpClient) {}
  depturl: string = 'https://localhost:44322/api/Departments';
  courseurl: string =
    'https://localhost:44322/api/Courses/ViewCoursesByDepartment';
  deptDDL: string = 'https://localhost:44322/api/Departments/LoadDeptDDL';
  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.depturl);
  }
  getDeptDDL(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.deptDDL + `?str=${query}`);
  }
  getCourse(query: number): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.courseurl + `?departmentId=${query}`
    );
  }
}
