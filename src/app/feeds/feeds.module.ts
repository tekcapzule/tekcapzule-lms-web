import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedsComponent } from './feeds.component';

@NgModule({
  declarations: [FeedsComponent],
  imports: [CommonModule, FeedsRoutingModule],
})
export class FeedsModule {}
