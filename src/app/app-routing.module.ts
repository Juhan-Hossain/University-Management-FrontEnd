import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SaveDepartmentComponent } from './saveDepartment/saveDepartment.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';

const routes: Routes = [
  { path: 'Create-Department', component: SaveDepartmentComponent },
  { path: 'View-Department', component: ViewDepartmentComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
