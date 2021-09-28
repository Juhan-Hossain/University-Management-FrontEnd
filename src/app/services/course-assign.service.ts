import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class CourseAssignService {
  constructor(private http: HttpClient) {}

  courseAssign: string =
    'https://localhost:44322/api/CourseAssignment/CreateCourseAssignment';

  addCourseAssign(data: any) {
    return this.http.post(this.courseAssign, data);
  }
}
