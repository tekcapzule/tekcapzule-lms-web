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
      this.getCourse(params['code']);
    });
  }

  getCourse(code: string) {
    this.courseApi.getCourse([code]).subscribe(data => {
      this.course = data[0];  
      this.getPlayVideo();
    });
    //this.course = this.courseApi.courses.find(c => c.courseId === code) as ICourseDetail;
  }

  getPlayVideo() {
    this.course.duration = 0;
    this.course.modules.forEach(module => {
      module.duration = 0;
      module.chapters.forEach(video => {
        module.duration = module.duration + video.duration; 
        if(!video.completed && !this.currentVideo) {
          this.currentVideo = video;
          if(this.playerReady) {
            this.isVideoPlaying = true;
            this.onVideoChange(video);
          }
        }
      });
      this.course.duration = this.course.duration + module.duration; 
      if(module.duration) {
        module.duration = module.duration;
      }
    });
  }

  onPlayerReady() {
    this.playerReady = true;
    if (!this.isVideoPlaying && this.currentVideo) {
      console.log('this.isVideoPlaying && this.currentVideo  ', this.isVideoPlaying, this.currentVideo)
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
