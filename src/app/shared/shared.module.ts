import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from './components/course-card/course-card.component';

@NgModule({
  declarations: [
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CourseCardComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
