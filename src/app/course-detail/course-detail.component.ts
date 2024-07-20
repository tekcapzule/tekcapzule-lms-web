import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseApiService, DashboradApiService } from '@app/core';
import { AuthStateService } from '@app/core/services';
import { ICourseDetail } from '@app/shared/models/course-item.model';

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

  constructor(
    private router: Router,
    private courseApi: CourseApiService,
    private dashboardApi: DashboradApiService,
    public authState: AuthStateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authState.isUserLoggedIn();
    this.route.params.subscribe(params => {
      this.getWishlistCourse(params['code']);
    });
    this.firstName = 'John'; 
    this.lastName = 'Doe';   
    this.profileImage = this.firstName.charAt(0) + this.lastName.charAt(0);
  }

  getWishlistCourse(code: string) {
    this.courseApi.getCourse([code]).subscribe(
      data => {
        this.course = data[0] as ICourseDetail;
      },
      err => {}
    );
  }

  onEnrollCourse() {
    this.dashboardApi.enrollCourse(this.course.courseId).subscribe(data => {
      console.log('enrollCourse', data);
    })
  }
}
