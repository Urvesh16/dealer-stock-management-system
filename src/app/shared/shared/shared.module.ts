import { NgModule } from '@angular/core';
import { DecimalSpacePipe } from './decimal-space.pipe';




@NgModule({
  declarations: [DecimalSpacePipe],
  exports: [DecimalSpacePipe],
})
export class SharedModule {}