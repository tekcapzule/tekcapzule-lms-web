import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseEditorComponent } from './course-editor.component';

const routes: Routes = [
  {
    path: '',
    component: CourseEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseEditorRoutingModule {}
