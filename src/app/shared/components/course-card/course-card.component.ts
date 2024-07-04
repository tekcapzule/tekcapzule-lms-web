import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import * as moment from 'moment';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  
  @Input() course: ICourseDetail;
  @Input() page: string;
  parseInt = parseInt;
  math = Math;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateCourseTime();
    this.course.publishedOn = this.course.publishedOn ? moment(this.course.publishedOn, 'DD/MM/YYYY').fromNow() : 'NA';
  }

  updateCourseTime() {
    this.course.duration = 0;
    this.course.modules.forEach(module => {
      module.chapters.forEach(chapter => {
        this.course.duration += +chapter.duration;
      });
    });

    console.log('this.course.duration  ', this.course.duration, this.course.watchedDuration);
  }

  onResume() {
    if(this.page === 'Dashboard') {
      this.router.navigateByUrl('/lms/video-detail/'+this.course.courseId);
    } else {
      this.router.navigateByUrl('/lms/course-detail/'+this.course.courseId);
    }
  }
}
