import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class AllocateClassroomService {
  constructor(private http: HttpClient) {}
  departmentUrl: string = 'https://localhost:44322/api/Departments';
  courseUrl: string =
    'https://localhost:44322/api/Courses/CoursesByDepartmentAndStrDDL';
  roomUrl: string = 'https://localhost:44322/api/Room/LoadRoomDDL';
  dayUrl: string = 'https://localhost:44322/api/Day/LoadDayDDL';
  allocateUrl: string =
    'https://localhost:44322/api/RoomAllocation/AllocateRooms';
  deptDDL: string = 'https://localhost:44322/api/Departments/LoadDeptDDL';

  getDepartment(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.departmentUrl);
  }
  getRoom(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.roomUrl + `?str=${query}`);
  }
  getDay(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.dayUrl + `?str=${query}`);
  }

  getCourse(query: number, search: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.courseUrl + `?departmentId=${query}&str=${search}`
    );
  }
  getDeptDDL(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.deptDDL + `?str=${query}`);
  }
  allocateClass(data: any) {
    return this.http.post(this.allocateUrl, data);
  }
}
