import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class UnallocateClassService {
  constructor(private http: HttpClient) {}
  Unallocatingurl: string =
    'https://localhost:44322/api/DeletedCourseAssign/UnAssaignAllCourses';

  UnallocatingClasses(): Observable<serviceResponse> {
    return this.http.delete<serviceResponse>(this.Unallocatingurl);
  }
}
