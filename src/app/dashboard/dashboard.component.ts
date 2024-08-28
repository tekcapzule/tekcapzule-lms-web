import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService, DashboradApiService } from '@app/core';
import { AuthStateService } from '@app/core/services';
import { InitService } from '@app/core/services/app-state/init.service';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ITaskItem } from '@app/shared/models/task-item.model';
import { IEnrollment, IStatus, IUser } from '@app/shared/models/user-item.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courseList: ICourseDetail[] = [];
  taskList: ITaskItem[] = [];
  userData: IUser;
  courseStatus: IEnrollment[] = [];
  enrolledCourses: number = 0;
  activeCourses: number = 0;
  completedCourses: number = 0;
  fullName: string;
  firstName: string;
  pollSelectedId: string;
  isPollSubmitted: boolean;
  pollOptions = [
    {id: "1", name:"Artificial Intelligence", percentage: 45},
    {id: "2", name:"Machine Learning", percentage: 25},
    {id: "3", name:"Metaverse", percentage: 20},
    {id: "4", name:"Web 3.0", percentage: 10}
  ];

  constructor(
    private courseApi: CourseApiService,
    private authState: AuthStateService,
    private dashboardApi: DashboradApiService,
    private initService: InitService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userData = this.initService.getUserData();
    this.courseStatus = this.userData.enrollments;
    this.firstName = this.authState.getFirstName() || "Linjith";
    this.fullName = this.authState.getFullName();
    this.getAllTask();
    this.getCourses();
  }

  getCourses() {
    const courseIds: string[] = [];
    if(!this.courseStatus) {
      return;
    }
    this.courseStatus.forEach((course) => {
      if(course) {
        if(course.course.status === IStatus.COMPLETED) {
          this.completedCourses += 1;
        } else if(course.course.status === IStatus.IN_PROGRESS) {
          this.activeCourses += 1;
        } else {
          this.enrolledCourses += 1;
        }
        if(course.courseId){
          courseIds.push(course.courseId);
        }
      }
    });
    this.courseApi.getCourse(courseIds).subscribe(courses => {
      this.courseList = courses;
      this.courseApi.courses = courses;
      this.courseList.forEach(course => {
        if(course) {
          course.watchedDuration = this.getWatchedDuration(course.courseId);
          // console.log('course', course.watchedDuration);
        }
      });
    });
  }

  getWatchedDuration(courseId: string) {
    let watchedDuration = 0;
    const courseStatus = this.courseStatus.find(enroll => enroll.courseId === courseId)?.course;
    courseStatus?.modules?.forEach(module => {
      module.chapters.forEach(chapter => {
        watchedDuration += +chapter.watchedDuration;
      });
    });
    return watchedDuration;
  }


  getAllTask() {
    this.dashboardApi.getAllTask().subscribe(
      data => {
        this.taskList = data;
      },
      err => {}
    );
  }

  onSwitch(event: any) {
    console.log('eve ', event);
    if (event.currentTarget.value === 'Dashboard') {
      this.router.navigateByUrl('/lms/dashboard');
    } else {
      this.router.navigateByUrl('/lms/feeds');
    }
  }

  onOptionSelect(optionId: string) {
    this.pollSelectedId = optionId;
  }
  onPollSubmit() {
    this.isPollSubmitted = true;

  }

  logOutUser() {}
}
