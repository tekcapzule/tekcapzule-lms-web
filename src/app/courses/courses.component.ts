import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService } from '@app/core';
import { InitService } from '@app/core/services/app-state/init.service';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { IEnrollment, IStatus, IUser } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  activeList: ICourseDetail[] = [];
  completeList: ICourseDetail[] = [];
  wishlistList: ICourseDetail[] = [];
  filteredList: ICourseDetail[] = [];
  selectedTab: string = 'active';
  selectedTopic: string[] = [];
  selectedLevel: string[] = [];
  userData: IUser;
  courseStatus: IEnrollment[] = [];
  
  constructor(
    private router: Router,
    private initService: InitService,
    private courseApi: CourseApiService
  ) {}

  ngOnInit(): void {
    this.userData = this.initService.getUserData();
    this.courseStatus = this.userData.enrollments;
    
    this.getAllCourse();
  }

  formatCount(count: number): string {
    return count < 10 ? '0' + count : count.toString();
  }

  getAllCourse() {
    this.courseApi.getAllCourse().subscribe(
      data => {
        this.wishlistList = data;
        this.filteredList = data;
        data.forEach(course => {
          let courseStatus = this.getCourseStatus(course.courseId);
          if(courseStatus?.course.status === IStatus.COMPLETED) {
            this.completeList.push(course);
          } else {
            this.activeList.push(course);
          }
        });
      },
      err => {}
    );
  }

  getCourseStatus(courseId: string) {
    return this.courseStatus.find(c => c.courseId === courseId);
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
      },
      err => {}
    );
  }

  
  getWishlistCourse() {
    this.courseApi.getWishlistCourse().subscribe(
      data => {
        this.wishlistList = data;
        this.filteredList = data;
      },
      err => {}
    );
  }

  toggleTab(tabName: string) {
    this.selectedTab = tabName;
  }

  onFilterUpdate(selectedFilters: any) {
    this.selectedTopic = selectedFilters.topic;
    this.selectedLevel = selectedFilters.level;
    this.filterCourse();
  }

  filterCourse() {
    let tempList = [...this.wishlistList];
    if (this.selectedTopic.length) {
      tempList = tempList.filter(tl => this.selectedTopic.includes(tl.topicCode));
    }
    if (this.selectedLevel.length) {
      tempList = tempList.filter(tl => this.selectedLevel.includes(tl.courseLevel));
    }
    this.filteredList = tempList
  }
}
