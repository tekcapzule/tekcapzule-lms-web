import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    CourseDetailRoutingModule,    
    ToastModule
  ],
})
export class CourseDetailModule {}
