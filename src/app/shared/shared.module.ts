import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckboxModule } from 'primeng/checkbox';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CourseSkeletonComponent } from './components/course-skeleton/course-skeleton.component';
import { DataFilterComponent } from './components/data-filter/data-filter.component';
import { FAQComponent } from './components/faq/faq.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

@NgModule({
  declarations: [
    CourseSkeletonComponent,
    CourseCardComponent,
    DataFilterComponent,
    VideoPlayerComponent,
    SpinnerComponent,
    FAQComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    BreadcrumbModule
  ],
  exports: [
    CourseSkeletonComponent,
    CourseCardComponent,
    DataFilterComponent,
    VideoPlayerComponent,
    SpinnerComponent,
    FAQComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
