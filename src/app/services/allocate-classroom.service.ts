import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class AllocateClassroomService {
  constructor(private http: HttpClient) {}
  allocateUrl: string =
    'https://localhost:44322/api/RoomAllocation/AllocateRooms';
  allocateClass(data: any) {
    return this.http.post(this.allocateUrl, data);
  }
}
