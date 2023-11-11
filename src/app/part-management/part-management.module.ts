import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PartManagementComponent } from './part-management.component';
import { partManagementoutingModule } from './part-management-routing.module';
import { SharedModule } from '../shared/shared/shared.module';




@NgModule({
  declarations: [PartManagementComponent],
  imports: [
    CommonModule,FormsModule,partManagementoutingModule,SharedModule
  
  ]
})
export class PartManagementModule { }