import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class UnassignCoursesService {
  constructor(private http: HttpClient) {}
  Unassignurl: string =
    'https://localhost:44322/api/DeletedCourseAssign/UnAssaignAllCourses';

  UnassignAllCourses(): Observable<serviceResponse> {
    return this.http.delete<serviceResponse>(this.Unassignurl);
  }
}
