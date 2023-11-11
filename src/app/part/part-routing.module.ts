import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartComponent } from './part.component';





const routes: Routes = [
  {
    path: '',
    component: PartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class partRoutingModule { }