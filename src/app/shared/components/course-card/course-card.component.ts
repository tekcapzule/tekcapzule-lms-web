import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ICourseStatus } from '@app/shared/models/user-item.model';
import * as moment from 'moment';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  
  @Input() course: ICourseDetail;
  @Input() page: string;
  @Input() courseStatus: ICourseStatus;
  parseInt = parseInt;
  math = Math;
  formattedDuration: string;
  progress = 0;

  constructor(private router: Router, private courseApi: CourseApiService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.course.publishedOn = this.course.publishedOn ? moment(this.course.publishedOn, 'DD/MM/YYYY').fromNow() : 'NA';
    this.updateCourseTime();
    if(this.courseStatus) {
      this.progress = this.helperService.getProgress(this.courseStatus, this.course);
    }
  }

  updateCourseTime() {
    this.course.duration = 0;
    this.course.modules.forEach(module => {
      module.chapters.forEach(chapter => {
        this.course.duration += +chapter.duration;
      });
    });
    this.formattedDuration = this.getFormattedDuration(this.course.duration);
    //console.log('this.course.duration  ', this.course.duration, this.course.watchedDuration);
  }

  getFormattedDuration(duration: number): string {
    const minutes = Math.round(duration % 60);
    const hours = Math.floor(minutes / 60);
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
