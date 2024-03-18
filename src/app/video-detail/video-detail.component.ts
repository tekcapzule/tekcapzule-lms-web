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
    loop: false,
    autoplay: false,
    muted: false,
    controls: true
  }
  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;
  playerReady: boolean;
  currentVideo: IVideoDetail | null;
  isVideoPlaying: boolean;

  constructor(
    private router: Router,
    private courseApi: CourseApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getWishlistCourse(params['code']);
    });
  }

  getWishlistCourse(code: string) {
    this.courseApi.getWishlistCourse().subscribe(
      data => {
        this.course = data.find(c => c.learningMaterialId === code) as ICourseDetail;
        this.getPlayVideo();
      },
      err => {}
    );
  }

  getPlayVideo() {
    this.course.modules.forEach(module => {
      module.videos.forEach(video => {
        if(!video.completed && !this.currentVideo) {
          this.currentVideo = video;
          if(this.playerReady) {
            this.isVideoPlaying = true;
            this.onVideoChange(video);
          }
        }
      });
    });
  }

  onPlayerReady() {
    this.playerReady = true;
    if (!this.isVideoPlaying && this.currentVideo) {
      this.isVideoPlaying = true;
      this.onVideoChange(this.currentVideo);
    }
  }

  onVideoEnded() {
    this.currentVideo = null;
    this.getPlayVideo();
  }

  onVideoChange(videoDetail: IVideoDetail) {
    this.videoPlayer.changeVideo(videoDetail);
  }
}
