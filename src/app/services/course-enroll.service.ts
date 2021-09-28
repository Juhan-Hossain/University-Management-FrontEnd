import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class CourseEnrollService {
  constructor(private http: HttpClient) {}
  courseEnrollUrl: string =
    'https://localhost:44322/api/CourseEnroll/CreateCourseEnroll';
  addCourseEnroll(data: any) {
    return this.http.post(this.courseEnrollUrl, data);
  }
}
