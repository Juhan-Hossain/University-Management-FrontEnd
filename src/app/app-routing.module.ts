import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SaveDepartmentComponent } from './saveDepartment/saveDepartment.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';

const routes: Routes = [

  { path: '', component: AppComponent,pathMatch:'full' },
  { path: 'Create-Department', component: SaveDepartmentComponent },
  { path: 'View-Department', component: ViewDepartmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
