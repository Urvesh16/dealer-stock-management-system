import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MechanicComponent } from './mechanic.component';





const routes: Routes = [
  {
    path: '',
    component: MechanicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class mechanicRoutingModule { }