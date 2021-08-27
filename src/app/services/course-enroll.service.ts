import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseEnrollService {

  constructor(private http: HttpClient) { }
  studentUrl: string = 'https://localhost:44322/api/Students/GetStudents';
  studentCourseUrl:string ="https://localhost:44322/api/Courses/CoursesByStudentRegNo"

  getStudent(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.studentUrl);
  }

  getCourses(data: any) {
    return this.http.post(`${this.studentCourseUrl}/CreateStudent`, data);
  }

}
