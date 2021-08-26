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
  registerStudentUrl:string ="https://localhost:44322/api/Students"

  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.depturl);
  }

  saveCourse(data: any) {
    return this.http.post(`${this.registerStudentUrl}/CreateStudent`, data);
  }


}
