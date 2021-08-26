import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root'
})
export class RegisterStudentService {
  constructor(private http: HttpClient) { }
  depturl: string = 'https://localhost:44322/api/Departments';
  saveStudent: string = 'https://localhost:44322/api/Students/CreateStudent';
  // saveTeacher(data: any) {
  //   return this.http.post(`${this.teacherurl}/CreateTeacher`, data);
  // }

  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.depturl);
  }
  // getDesignation(): Observable<serviceResponse> {
  //   return this.http.get<serviceResponse>(this.designationurl);
  // }
}
