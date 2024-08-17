import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentComponent } from './assessment.component';
import { SafePipe } from '@app/core/pipe/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  imports: [CommonModule, AssessmentRoutingModule],
})
export class AssessmentModule {}
