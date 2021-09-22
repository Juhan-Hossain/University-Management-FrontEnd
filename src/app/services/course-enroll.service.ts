import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class CourseEnrollService {
  constructor(private http: HttpClient) {}
  studentUrl: string = 'https://localhost:44322/api/Students/GetStudents';
  studentCourseUrl: string =
    'https://localhost:44322/api/Courses/CoursesByStudentRegNoDDL';
  departmentUrl: string = 'https://localhost:44322/api/Departments';
  courseEnrollUrl: string =
    'https://localhost:44322/api/CourseEnroll/CreateCourseEnroll';
  StdDDL: string = 'https://localhost:44322/api/Students/LoadStdDDL';
  getStudent(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.studentUrl);
  }

  getStdDDL(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.StdDDL + `?str=${query}`);
  }
  getCourse(query: string, search: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.studentCourseUrl + `?stdRegNo=${query}&str=${search}`
    );
  }
  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.departmentUrl);
  }
  addCourseEnroll(data: any) {
    return this.http.post(this.courseEnrollUrl, data);
  }
}
