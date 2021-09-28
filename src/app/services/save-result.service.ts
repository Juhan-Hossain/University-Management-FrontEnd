import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class SaveResultService {
  constructor(private http: HttpClient) {}
  saveResultUrl: string =
    'https://localhost:44322/api/StudentResult/CreateStudentResult';
  addStudentResult(data: any) {
    return this.http.post(this.saveResultUrl, data);
  }
}
