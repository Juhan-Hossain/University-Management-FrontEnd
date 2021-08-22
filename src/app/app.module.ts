import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SaveDepartmentComponent } from './home/save-department/save-department.component';
import { ViewDepartmentComponent } from './home/view-department/view-department.component';
import { SaveCourseComponent } from './home/save-course/save-course.component';
import { SaveTeacherComponent } from './home/save-teacher/save-teacher.component';
import { CourseAssignTOTeacherComponent } from './home/course-assign-to-teacher/course-assign-to-teacher.component';
import { ViewCourseStatComponent } from './home/view-course-stat/view-course-stat.component';
import { RegisterStudentComponent } from './home/register-student/register-student.component';

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
    RegisterStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
