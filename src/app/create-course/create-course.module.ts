import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCourseComponent } from './create-course.component';
import { CreateCourseRoutingModule } from './create-course-routing.module';

@NgModule({
  declarations: [CreateCourseComponent],
  imports: [CommonModule, CreateCourseRoutingModule],
})
export class CreateCourseModule {}
