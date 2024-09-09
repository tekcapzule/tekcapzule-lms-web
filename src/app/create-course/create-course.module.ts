import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCourseComponent } from './create-course.component';
import { CreateCourseRoutingModule } from './create-course-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [CreateCourseComponent],
  imports: [CommonModule, CreateCourseRoutingModule, DropdownModule, FormsModule, RadioButtonModule, InputTextModule, FileUploadModule, ReactiveFormsModule, CalendarModule, SidebarModule],
})
export class CreateCourseModule { }
