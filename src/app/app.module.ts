import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SaveDepartmentComponent } from './saveDepartment/saveDepartment.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';
import { SaveCourseComponent } from './save-course/save-course.component';
import { SaveTeacherComponent } from './save-teacher/save-teacher.component';
// import { CourseAssignTOTeacherComponent } from './course-assign-to-teacher/course-assign-to-teacher.component';
// import { ViewCourseStatComponent } from './view-course-stat/view-course-stat.component';
// import { RegisterStudentComponent } from './register-student/register-student.component';
import * as ngxBootstrap from 'ngx-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CourseEnrollComponent } from './course-enroll/course-enroll.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { CourseAssignTOTeacherComponent } from './course-assign-to-teacher/course-assign-to-teacher.component';
import { ViewCourseStatComponent } from './view-course-stat/view-course-stat.component';
import { AllocateClassroomComponent } from './allocate-classroom/allocate-classroom.component';
import { SaveResultComponent } from './save-result/save-result.component';
import { ViewResultComponent } from './view-result/view-result.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SaveDepartmentComponent,
    ViewDepartmentComponent,
    SaveCourseComponent,
    SaveTeacherComponent,
    CourseAssignTOTeacherComponent,
    ViewCourseStatComponent,
    RegisterStudentComponent,
    CourseEnrollComponent,
    AllocateClassroomComponent,
    SaveResultComponent,
    ViewResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
