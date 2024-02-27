import { Component, OnInit } from '@angular/core';
import { CourseApiService, DashboradApiService } from '@app/core';
import { Router } from '@angular/router';
import { signOut } from 'aws-amplify/auth';
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
    private router: Router,
    private courseApi: CourseApiService,
    private dashboardApi: DashboradApiService
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

  logOutUser() {
    signOut().then(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
