import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}
  teacherurl: string = 'https://localhost:44322/api/Teachers';
  saveTeacher(data: any) {
    return this.http.post(`${this.teacherurl}/CreateTeacher`, data);
  }
}
