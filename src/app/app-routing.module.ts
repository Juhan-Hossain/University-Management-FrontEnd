import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SaveDepartmentComponent } from './saveDepartment/saveDepartment.component';

const routes: Routes = [

  { path: '', component: AppComponent,pathMatch:'full' },
  { path: 'Create-Department', component: SaveDepartmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
