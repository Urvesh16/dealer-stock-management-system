import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartManagementComponent } from './part-management.component';





const routes: Routes = [
  {
    path: '',
    component: PartManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class partManagementoutingModule { }