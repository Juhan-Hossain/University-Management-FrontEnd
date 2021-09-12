import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class saveDepartmentService {
  url: string = 'https://localhost:44322/api/Departments';

  constructor(private http: HttpClient) {}

  saveDepartment(data: number) {
    return this.http.post(`${this.url}/CreateDepartment`, data);
  }

  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.url);
  }
}
