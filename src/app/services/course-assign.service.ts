import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseAssignService {

  constructor(private http: HttpClient) { }
  departmentUrl: string = 'https://localhost:44322/api/Departments';
  courseurl: string =
    'https://localhost:44322/api/Courses/ViewCoursesByDepartment';
    teacherurl: string =
      'https://localhost:44322/api/Teachers/Department/';
  courseAssign: string = 'https://localhost:44322/api/CourseAssignment/CreateCourseAssignment';

    getDepartment(): Observable<serviceResponse> {
      return this.http.get<serviceResponse>(this.departmentUrl);
    }
    getTeacher(query:number) : Observable<serviceResponse> {

      return this.http.get<serviceResponse>(this.teacherurl+query);
    }

    getCourse(query:number) : Observable<serviceResponse> {

      return this.http.get<serviceResponse>(this.courseurl+`?departmentId=${query}`);
    }
  addCourseAssign(data:any) {
    return this.http.post(this.courseAssign,data);
  }
}
