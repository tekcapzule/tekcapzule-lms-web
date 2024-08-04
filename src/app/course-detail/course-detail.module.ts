import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailComponent } from './course-detail.component';
import { SharedModule } from '@app/shared/shared.module';
import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [CommonModule,
    SharedModule,
    CourseDetailRoutingModule,    
    ToastModule
  ],
})
export class CourseDetailModule {}
