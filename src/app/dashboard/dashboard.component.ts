import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService, DashboradApiService } from '@app/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ITaskItem } from '@app/shared/models/task-item.model';
import { IEnrollment } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courseList: ICourseDetail[] = [];
  taskList: ITaskItem[] = [];
  enrollmentStatus: IEnrollment[] = [];

  constructor(
    private courseApi: CourseApiService,
    private dashboardApi: DashboradApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTask();
    this.getCourses();
  }

  getCourses() {
    this.dashboardApi.getUserDetails().subscribe(data => {
      console.log('Dashboard ', data);
      this.enrollmentStatus = data.enrollments;
      const courseIds: string[] = [];
      data.enrollments.forEach((enrollment) => {
        courseIds.push(enrollment.courseId);
      });
      console.log('courseId --- >>> ', courseIds);
      this.courseApi.getCourse(courseIds).subscribe(courses => {
        this.courseList = courses;
        this.courseApi.courses = courses;
        this.courseList.forEach(course => {
          course.watchedDuration = this.getWatchedDuration(course.courseId);
          console.log('course', course.watchedDuration);
        });
      });
    });
  }

  getWatchedDuration(courseId: string) {
    let watchedDuration = 0;
    const courseStatus = this.enrollmentStatus.find(enroll => enroll.courseId === courseId)?.course;
    courseStatus?.modules.forEach(module => {
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

  logOutUser() {}
}
