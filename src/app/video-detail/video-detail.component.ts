import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseApiService } from '@app/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  course: ICourseDetail;

  constructor(
    private router: Router,
    private courseApi: CourseApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //this.pageId = params['pageId'];
      this.getWishlistCourse(params['code']);
    });
  }

  getWishlistCourse(code: string) {
    this.courseApi.getWishlistCourse().subscribe(
      data => {
        this.course = data.find(c => c.learningMaterialId === code) as ICourseDetail;
      },
      err => {}
    );
  }
}