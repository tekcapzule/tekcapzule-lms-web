import { Component, OnInit } from '@angular/core';
import { CourseApiService } from '@app/core';
import { Router } from '@angular/router';
import { signOut } from 'aws-amplify/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private courseApi: CourseApiService) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseApi.getAllCourse().subscribe(
      data => {
        console.log('data ----------- >>> ', data);
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
