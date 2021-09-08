import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class ViewAllocatedroomsService {
  constructor(private http: HttpClient) {}
  depturl: string = 'https://localhost:44322/api/Departments';
  RoomByDeptIdUrl: string =
    'https://localhost:44322/api/RoomAllocation/DepartmentId';
  courseurl: string =
    'https://localhost:44322/api/Courses/GetCoursesByDepartment';
  roomUrl: string = 'https://localhost:44322/api/Room/GetRooms';
  dayUrl: string = 'https://localhost:44322/api/Day/GetDays';
  RoomsByCodeUrl: string = 'https://localhost:44322/api/RoomAllocation/CourseCode';

  getCourse(query: number): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.courseurl + `?departmentId=${query}`
    );
  }
  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.depturl);
  }

  getAllocatedRooms(query: number): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.RoomByDeptIdUrl + `?id=${query}`
    );
  }

  getRoom(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.roomUrl);
  }
  getDay(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.dayUrl);
  }

  getRoomsByCode(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.RoomsByCodeUrl + `?code=${query}`
    );
  }
}
