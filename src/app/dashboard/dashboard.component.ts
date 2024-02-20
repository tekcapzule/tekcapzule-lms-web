import { Component, OnInit } from '@angular/core';
import { CourseApiService } from '@app/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private courseApi: CourseApiService
    ) {

  }
  ngOnInit(): void {
    this.getAllCourses();
  }
  getAllCourses() {
    this.courseApi.getAllCourse().subscribe(data => {
      console.log('data ----------- >>> ', data);
    }, err => {
    });
  }

}
