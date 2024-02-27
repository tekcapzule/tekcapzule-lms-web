import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { DataFilterComponent } from './components/data-filter/data-filter.component';

@NgModule({
  declarations: [
    CourseCardComponent,
    DataFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CourseCardComponent,
    DataFilterComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
