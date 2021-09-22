import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class CourseAssignService {
  constructor(private http: HttpClient) {}
  departmentUrl: string = 'https://localhost:44322/api/Departments';
  courseurl: string =
    'https://localhost:44322/api/Courses/CoursesByDepartmentAndStrDDL';
  teacherurl: string = 'https://localhost:44322/api/Teachers/TeacherDDL';
  allTeacherUrl: string = 'https://localhost:44322/api/Teachers/GetTeachers';
  courseAssign: string =
    'https://localhost:44322/api/CourseAssignment/CreateCourseAssignment';
  deptDDL: string = 'https://localhost:44322/api/Departments/LoadDeptDDL';

  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.departmentUrl);
  }
  getDeptDDL(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.deptDDL + `?str=${query}`);
  }
  getTeachers(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.allTeacherUrl);
  }
  getTeacher(query: number, search: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.teacherurl + `?departmentId=${query}&str=${search}`
    );
  }

  getCourse(query: number, search: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.courseurl + `?departmentId=${query}&str=${search}`
    );
  }
  addCourseAssign(data: any) {
    return this.http.post(this.courseAssign, data);
  }
}
