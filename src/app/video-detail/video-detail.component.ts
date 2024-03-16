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
  options = {
    fluid: true,
    loop: true,
    autoplay: true,
    muted: true,
    controls: true,
    sources: [{ src: 'https://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }
  ]}
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
