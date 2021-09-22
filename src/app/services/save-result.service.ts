import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class SaveResultService {
  constructor(private http: HttpClient) {}
  studentUrl: string = 'https://localhost:44322/api/Students/GetStudents';
  departmentUrl: string = 'https://localhost:44322/api/Departments';
  courseEnrollUrl: string =
    'https://localhost:44322/api/CourseEnroll/CreateCourseEnroll';
  studentCourseUrl: string =
    'https://localhost:44322/api/Courses/EnrolledCoursesByStudentRegNoDDL';

  saveResultUrl: string =
    'https://localhost:44322/api/StudentResult/CreateStudentResult';
  gradeUrl: string = 'https://localhost:44322/api/Grades/LoadGradeDDL';
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
  getGrade(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.gradeUrl + `?str=${query}`);
  }

  addStudentResult(data: any) {
    return this.http.post(this.saveResultUrl, data);
  }
}
