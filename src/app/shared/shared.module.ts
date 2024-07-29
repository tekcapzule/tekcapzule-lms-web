import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { DataFilterComponent } from './components/data-filter/data-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { SecondsToMinutesPipe } from '@app/core/pipe/seconds-to-minutes.pipe';
import { CourseSkeletonComponent } from './components/course-skeleton/course-skeleton.component';

@NgModule({
  declarations: [
    CourseCardComponent,
    DataFilterComponent,
    VideoPlayerComponent,
    CourseSkeletonComponent
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
    CourseCardComponent,
    DataFilterComponent,
    VideoPlayerComponent,
    CourseSkeletonComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
