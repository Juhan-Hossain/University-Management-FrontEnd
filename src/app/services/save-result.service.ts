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
  studentCourseUrl: string = 'https://localhost:44322/api/Courses/EnrolledCoursesByStudentRegNo';

  saveResultUrl: string = 'https://localhost:44322/api/StudentResult/CreateStudentResult';
  gradeUrl: string = 'https://localhost:44322/api/Grades/GetGrades';

  getStudent(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.studentUrl);
  }

  getCourse(query:string) : Observable<serviceResponse> {

    return this.http.get<serviceResponse>(this.studentCourseUrl + `?stdRegNo=${query}`);

  }
  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.departmentUrl);
  }
  getGrade(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.gradeUrl);
  }

  addStudentResult(data:any)
  {
    return this.http.post(this.saveResultUrl,data);
  }

}
