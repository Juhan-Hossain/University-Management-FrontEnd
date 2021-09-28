import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  constructor(private http: HttpClient) {}
  teacherurl: string = 'https://localhost:44322/api/Teachers/TeacherDDL';
  allTeacherUrl: string = 'https://localhost:44322/api/Teachers/GetTeachers';
  departmentUrl: string = 'https://localhost:44322/api/Departments';
  courseUrl: string =
    'https://localhost:44322/api/Courses/CoursesByDepartmentAndStrDDL';
  roomUrl: string = 'https://localhost:44322/api/Room/LoadRoomDDL';
  dayUrl: string = 'https://localhost:44322/api/Day/LoadDayDDL';

  deptDDL: string = 'https://localhost:44322/api/Departments/LoadDeptDDL';
  studentUrl: string = 'https://localhost:44322/api/Students/GetStudents';
  studentCourseUrl: string =
    'https://localhost:44322/api/Courses/CoursesByStudentRegNoDDL';
  // departmentUrl: string = 'https://localhost:44322/api/Departments';

  StdDDL: string = 'https://localhost:44322/api/Students/LoadStdDDL';
  semesterurl: string = 'https://localhost:44322/api/Semesters/LoadSemesterDDL';
  studentEnrolledCourseUrl: string =
    'https://localhost:44322/api/Courses/EnrolledCoursesByStudentRegNoDDL';
  gradeUrl: string = 'https://localhost:44322/api/Grades/LoadGradeDDL';
  designationurl: string =
    'https://localhost:44322/api/Designations/LoadDesignationDDL';
  getDesignation(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.designationurl + `?str=${query}`
    );
  }

  getGrade(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.gradeUrl + `?str=${query}`);
  }
  getEnrolledCourseByStd(
    query: string,
    search: string
  ): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.studentEnrolledCourseUrl + `?stdRegNo=${query}&str=${search}`
    );
  }

  getSemester(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.semesterurl + `?str=${query}`);
  }
  getStudent(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.studentUrl);
  }

  getStdDDL(query: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.StdDDL + `?str=${query}`);
  }
  getStdCourse(query: string, search: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.studentCourseUrl + `?stdRegNo=${query}&str=${search}`
    );
  }
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
  getTeachers(): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(this.allTeacherUrl);
  }
  getTeacher(query: number, search: string): Observable<serviceResponse> {
    return this.http.get<serviceResponse>(
      this.teacherurl + `?departmentId=${query}&str=${search}`
    );
  }
}
