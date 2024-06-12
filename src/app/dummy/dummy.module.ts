import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedsRoutingModule } from './dummy-routing.module';
import { FeedsComponent } from './dummy.component';

@NgModule({
  declarations: [FeedsComponent],
  imports: [CommonModule, FeedsRoutingModule],
})
export class FeedsModule {}
