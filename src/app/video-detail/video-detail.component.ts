import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseApiService, DashboradApiService } from '@app/core';
import { VideoPlayerComponent } from '@app/shared/components/video-player/video-player.component';
import { IChapter, ICourseDetail } from '@app/shared/models/course-item.model';
import { ICourseStatus, IEnrollment } from '@app/shared/models/user-item.model';

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
  currentVideo: IChapter | any;
  isVideoPlaying: boolean;
  courseStatus: ICourseStatus;

  constructor(
    private router: Router,
    private courseApi: CourseApiService,
    private route: ActivatedRoute,
    private dashboardApi: DashboradApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getUserDetails(params['code']);
    });
  }

  getUserDetails(courseId: string) {
    this.dashboardApi.getUserDetails().subscribe(data => {
      const enrollment = data.enrollments.find(e => e.courseId === courseId) as IEnrollment;
      this.getCourse(enrollment);
    });
  }

  getCourse(enrollment: IEnrollment) {
    this.courseApi.getCourse([enrollment.courseId]).subscribe(data => {
      this.course = data[0]; 
      this.updateCourse(enrollment.course); 
      this.getPlayVideo();
    });
    //this.course = this.courseApi.courses.find(c => c.courseId === code) as ICourseDetail;
  }

  updateCourse(enrollmentCourse: any) {
    this.course.watchedDuration = 0;
    this.course.status = enrollmentCourse.status;
    this.course.modules.forEach((module, i) => {
      const enrollmentModule = enrollmentCourse.modules[i]
      module['watchedDuration'] = 0;
      if (enrollmentModule) {
        module['status'] = enrollmentModule.status;
        module.chapters.forEach((chapter, j) => {
          const enrollmentChapter = enrollmentModule.chapters[j];
          chapter.watchedDuration = 0;
          if(enrollmentChapter) {
            chapter.watchedDuration = enrollmentChapter.watchedDuration;
            chapter['status'] = enrollmentChapter.status;
          }
          module.watchedDuration = module.watchedDuration + chapter.watchedDuration; 
        });
      }
      this.course.watchedDuration = this.course.watchedDuration + module.watchedDuration; 
      if(module.watchedDuration) {
        module.watchedDuration = module.watchedDuration;
      }
    });
  }

  getPlayVideo() {
    this.currentVideo = null;
    this.course.duration = 0;
    this.course.modules.forEach(module => {
      module.chapters.forEach(chapter => {
        if((!chapter.status || chapter.status.toLowerCase() !== 'complete') && !this.currentVideo) {
          this.courseStatus = {
            courseId: this.course.courseId,
            watchedDuration: 0,
            status: '',
            lastVisitedModule: module.serialNumber,
            lastVisitedChapter: chapter.serialNumber,
            modules: [
              {
                serialNumber: module.serialNumber,
                watchedDuration: 0,
                status: '',
                chapters:[{
                  serialNumber: chapter.serialNumber,
                  watchedDuration: 0,
                  status: '',
                }]
              }]     
          }
          
          this.currentVideo = chapter as IChapter;
          if(this.playerReady) {
            this.isVideoPlaying = true;
            this.onVideoChange(this.currentVideo);
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

  onVideoChange(videoDetail: IChapter) {
    this.videoPlayer.changeVideo(this.course, this.courseStatus, videoDetail);
  }
}
