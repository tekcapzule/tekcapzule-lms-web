import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourseDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  
  @Input() course: ICourseDetail;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

}
