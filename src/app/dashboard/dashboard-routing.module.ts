import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
      { path: 'dealer', loadChildren: () => import('../dealer/dealer.module').then(m => m.DealerModule) },
      { path: 'mechanic', loadChildren: () => import('../mechanic/mechanic.module').then(m => m.MechanicModule) },
      { path: 'part', loadChildren: () => import('../part/part.module').then(m => m.PartModule) },
      { path: 'part-management', loadChildren: () => import('../part-management/part-management.module').then(m => m.PartManagementModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}