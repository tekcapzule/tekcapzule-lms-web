import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseApiService } from '@app/core';
import { VideoPlayerComponent } from '@app/shared/components/video-player/video-player.component';
import { ICourseDetail, IVideoDetail } from '@app/shared/models/course-item.model';

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
  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;

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

  onVideoChange(videoDetail: IVideoDetail) {
    this.videoPlayer.player.src({src: videoDetail.src, type: 'video/mp4'});
    console.log('video changed');
  }
}
