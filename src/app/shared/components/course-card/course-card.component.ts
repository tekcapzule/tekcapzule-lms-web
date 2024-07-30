import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService } from '@app/core';
import { InitService } from '@app/core/services/app-state/init.service';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ICourseStatus, IUser } from '@app/shared/models/user-item.model';
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
  userData: IUser;
  courseStatus: ICourseStatus;

  constructor(private router: Router,
    private courseApi: CourseApiService,
    private initService: InitService
  ) {}

  ngOnInit(): void {
    //this.updateCourseTime();
    this.userData = this.initService.getUserData();
    if (this.userData.enrollments && this.userData.enrollments.length) {
      this.userData.enrollments.forEach(en => {
        if(en.courseId === this.course.courseId) {
          this.courseStatus = en.course;
        }
      });
    }
    this.course.publishedOn = this.course.publishedOn ? moment(this.course.publishedOn, 'DD/MM/YYYY').fromNow() : 'NA';
  }

  updateCourseTime() {
    this.course.duration = 0;
    this.course.modules.forEach(module => {
      module.chapters.forEach(chapter => {
        this.course.duration += +chapter.duration;
      });
    });
  }

  onResume() {
    this.courseApi.currentCourse = this.course;
    if(this.page === 'Dashboard') {
      this.router.navigateByUrl('/lms/video-detail/'+this.course.courseId);
    } else {
      this.router.navigateByUrl('/lms/course-detail/'+this.course.courseId);
    }
  }
}
