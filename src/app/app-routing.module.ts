import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SaveCourseComponent } from './save-course/save-course.component';
import { SaveDepartmentComponent } from './saveDepartment/saveDepartment.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';

const routes: Routes = [
  { path: 'Create-Department', component: SaveDepartmentComponent },
  { path: 'View-Department', component: ViewDepartmentComponent },
  {
    path: 'Create-Course', component:
      SaveCourseComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
