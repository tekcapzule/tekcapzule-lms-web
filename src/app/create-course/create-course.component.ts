import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  specialization: any[];
  language: any[];
  tags: any[];
  instructor: any[];
  selectedSpecialization: any;
  value: string;
  formGroup: FormGroup;
  date: Date;
  sidebarVisible: boolean = false;
  ngOnInit(): void {
    // Initialize the form group with the form control for 'city'
    this.formGroup = new FormGroup({
      city: new FormControl<string | null>(null),
    });
  }
}
