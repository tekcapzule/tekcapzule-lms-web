import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseApiService, DashboradApiService } from '@app/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ITaskItem } from '@app/shared/models/task-item.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courseList: ICourseDetail[] = [];
  taskList: ITaskItem[] = [];

  constructor(
    private courseApi: CourseApiService,
    private dashboardApi: DashboradApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getActiveCourse();
    this.getAllTask();
  }

  getActiveCourse() {
    this.courseApi.getActiveCourse().subscribe(
      data => {
        this.courseList = data;
      },
      err => {}
    );
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
