import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SaveCourseComponent } from './save-course/save-course.component';
import { SaveTeacherComponent } from './save-teacher/save-teacher.component';
import { SaveDepartmentComponent } from './saveDepartment/saveDepartment.component';
import { ViewCourseStatComponent } from './view-course-stat/view-course-stat.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';

const routes: Routes = [
  { path: 'Create-Department', component: SaveDepartmentComponent },
  { path: 'View-Department', component: ViewDepartmentComponent },
  {
    path: 'Create-Course', component:
      SaveCourseComponent },
  { path: '', component: HomeComponent },
  {
    path: 'Create-Teacher', component:
      SaveTeacherComponent
  },
  {
    path: 'View-Course', component:
    ViewCourseStatComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
