import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  url: string = 'https://localhost:44322/api/ApplicationUser/Register';
  registerUser(data: any) {
    return this.http.post(this.url, data);
  }
}
