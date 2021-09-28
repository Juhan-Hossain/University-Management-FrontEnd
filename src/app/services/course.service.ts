import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courseurl: string = 'https://localhost:44322/api/Courses';

  constructor(private http: HttpClient) {}

  saveCourse(data: any) {
    return this.http.post(`${this.courseurl}/CreateCourse`, data);
  }
}
