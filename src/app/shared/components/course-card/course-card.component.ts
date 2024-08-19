import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService } from '@app/core';
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
  formattedDuration: string;

  constructor(private router: Router, private courseApi: CourseApiService) {}

  ngOnInit(): void {
    this.course.publishedOn = this.course.publishedOn ? moment(this.course.publishedOn, 'DD/MM/YYYY').fromNow() : 'NA';
    this.updateCourseTime();
    this.formattedDuration = this.getFormattedDuration(this.course.duration);
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

  getFormattedDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);
    return `${hours}hr ${minutes}min`;
  }

  onResume() {
    this.courseApi.currentCourse = this.course;
    if (this.page === 'Dashboard') {
      this.router.navigateByUrl('/lms/video-detail/' + this.course.courseId);
    } else {
      this.router.navigateByUrl('/lms/course-detail/' + this.course.courseId);
    }
  }
}
