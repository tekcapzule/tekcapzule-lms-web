import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService } from '@app/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  activeList: ICourseDetail[] = [];
  completeList: ICourseDetail[] = [];
  wishlistList: ICourseDetail[] = [];
  selectedTab: string = 'active';

  constructor(
    private router: Router,
    private courseApi: CourseApiService
  ) {}

  ngOnInit(): void {
    this.getActiveCourse();
    this.getCompletedCourse();
    this.getWishlistCourse();
  }

  getActiveCourse() {
    this.courseApi.getActiveCourse().subscribe(
      data => {
        this.activeList = data;
      },
      err => {}
    );
  }

  getCompletedCourse() {
    this.courseApi.getCompletedCourse().subscribe(
      data => {
        this.completeList = data;
      },
      err => {}
    );
  }

  
  getWishlistCourse() {
    this.courseApi.getWishlistCourse().subscribe(
      data => {
        this.wishlistList = data;
      },
      err => {}
    );
  }

  toggleTab(tabName: string) {
    this.selectedTab = tabName;
  }
}
