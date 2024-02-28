import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailComponent } from './course-detail.component';
import { SharedModule } from '@app/shared/shared.module';
import { CourseDetailRoutingModule } from './course-detail-routing.module';

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [CommonModule, SharedModule, CourseDetailRoutingModule],
})
export class CourseDetailModule {}
