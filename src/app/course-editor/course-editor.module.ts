import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseEditorRoutingModule } from './course-editor-routing.module';
import { CourseEditorComponent } from './course-editor.component';

@NgModule({
  declarations: [CourseEditorComponent],
  imports: [CommonModule, CourseEditorRoutingModule],
})
export class CourseEditorModule {}
