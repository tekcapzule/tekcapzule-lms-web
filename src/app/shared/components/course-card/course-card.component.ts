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
    this.formattedDuration = this.helperService.updateCourseTime(this.course);
    if(this.courseStatus) {
      this.progress = this.helperService.getProgress(this.courseStatus, this.course);
    }
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
