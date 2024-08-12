import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSpinnerService, CourseApiService, DashboradApiService } from '@app/core';
import { AuthStateService } from '@app/core/services';
import { InitService } from '@app/core/services/app-state/init.service';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { IEnrollment, IUser } from '@app/shared/models/user-item.model';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: ICourseDetail;
  firstName: string;
  lastName: string;
  profileImage: string;
  isUserLoggedIn: boolean;
  userData: IUser;
  courseStatus: IEnrollment[] = [];
  isCourseEnrolled: boolean;

  constructor(
    private router: Router,
    public spinner: AppSpinnerService,
    private courseApi: CourseApiService,
    private dashboardApi: DashboradApiService,
    public authState: AuthStateService,
    private initService: InitService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userData = this.initService.getUserData();
    this.courseStatus = this.userData.enrollments;
    this.isUserLoggedIn = this.authState.isUserLoggedIn();
    this.route.params.subscribe(params => {
      this.getWishlistCourse(params['code']);
    });
    this.firstName = 'John'; 
    this.lastName = 'Doe';   
    this.profileImage = this.firstName.charAt(0) + this.lastName.charAt(0);
  }

  getWishlistCourse(code: string) {
    this.spinner.show();
    this.courseApi.getCourse([code])
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe(
      data => {
        this.course = data[0] as ICourseDetail;
        if(this.courseStatus.length) {
          this.isCourseEnrolled = this.courseStatus.find(course => course.courseId === this.course.courseId) ? true : false;
          console.log('this.isCourseEnrolled  ', this.isCourseEnrolled);
        }
      },
      err => {}
    );
  }

  onEnrollCourse() {
    this.dashboardApi.enrollCourse(this.course.courseId).subscribe(data => {
      console.log('enrollCourse', data);
      this.isCourseEnrolled = true;
      this.messageService.add({
        key: 'tc',
        severity: 'success',
        detail: 'Thank you for Enrolling!',
      });
    })
  }

  onStartCourse() {
    this.router.navigateByUrl('/lms/video-detail/'+this.course.courseId);    
  }
}
