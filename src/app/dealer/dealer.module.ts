import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DealerComponent } from './dealer.component';
import { FormsModule } from '@angular/forms';
import { dealerRoutingModule } from './dealer-routing.module';



@NgModule({
  declarations: [DealerComponent],
  imports: [
    CommonModule,FormsModule,dealerRoutingModule
  
  ]
})
export class DealerModule { }