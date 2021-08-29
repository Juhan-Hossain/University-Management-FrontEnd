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

  getStudent(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.studentUrl);
  }

  // getCourse(query:string) : Observable<serviceResponse> {

  //   return this.http.get<serviceResponse>(this.studentCourseUrl + `?stdRegNo=${query}`);

  // }
  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.departmentUrl);
  }
}
