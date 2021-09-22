import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courseurl: string = 'https://localhost:44322/api/Courses';
  depturl: string = 'https://localhost:44322/api/Departments';
  semesterurl: string = 'https://localhost:44322/api/Semesters/LoadSemesterDDL';
  deptDDL: string = 'https://localhost:44322/api/Departments/LoadDeptDDL';

  constructor(private http: HttpClient) {}

  saveCourse(data: any) {
    return this.http.post(`${this.courseurl}/CreateCourse`, data);
  }

  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.depturl);
  }
  getDeptDDL(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.deptDDL + `?str=${query}`);
  }
  getSemester(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.semesterurl + `?str=${query}`);
  }
}
