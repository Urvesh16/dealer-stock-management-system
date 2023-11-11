import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PartComponent } from './part.component';
import { partRoutingModule } from './part-routing.module';
import { SharedModule } from '../shared/shared/shared.module';





@NgModule({
  declarations: [PartComponent],
  imports: [
    CommonModule,FormsModule,partRoutingModule,SharedModule
  
  ]
})
export class PartModule { }