import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MechanicComponent } from './mechanic.component';
import { mechanicRoutingModule } from './mechanic-routing.module';




@NgModule({
  declarations: [MechanicComponent],
  imports: [
    CommonModule,FormsModule,mechanicRoutingModule
  
  ]
})
export class MechanicModule { }