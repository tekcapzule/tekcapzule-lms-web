import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import { DashboradApiService } from '@app/core';
import { IChapter, ICourseDetail } from '@app/shared/models';
import { ICourseStatus } from '@app/shared/models/user-item.model';
import videojs from 'video.js';
import Player from "video.js/dist/types/player";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target: ElementRef;

  // See options: https://videojs.com/guides/options
  @Input() options: {
      fluid: boolean,
      autoplay: boolean,
      sources?: {
          src: string,
          type: string,
      }[],
  };
  videoDetail: IChapter;
  player: Player;
  isVideoStarted: boolean;
  courseStatus: ICourseStatus;
  previousSaved: number;
  @Input() course: ICourseDetail;
  @Output() playerReady = new EventEmitter();
  @Output() videoEnded = new EventEmitter();

  constructor(
    private dashboardApi: DashboradApiService
  ) {}

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(this.target.nativeElement, this.options);
    this.player.on('ready', this.onPlayerReady.bind(this));
    this.player.on('timeupdate', this.onTimeupdate.bind(this));
    this.player.on('s', this.onTimeupdate.bind(this));
    this.player.on('ended', this.onVideoEnded.bind(this));
  }
  
  onPlayerReady() {
    this.playerReady.emit();
  }

  onTimeupdate(data: any) {
    this.videoDetail.watchedDuration = this.player.currentTime() || 0;
    //console.log('this.videoDetail.watchedDuration  ', Math.floor(this.videoDetail.watchedDuration))
    const duration = Math.floor(this.videoDetail.watchedDuration);
    if(this.previousSaved !== duration && duration % 60 === 0) {
      this.previousSaved = duration;
      this.courseStatus.modules[0].chapters[0].watchedDuration = this.videoDetail.watchedDuration;
      this.updateProgress();
      console.log('status updated');
      
    }
  }

  onVideoEnded() {
    let isModuleCompleted = true;
    let isChapterCompleted = true;
    this.courseStatus.modules[0].chapters[0].watchedDuration = this.videoDetail.duration;
    this.courseStatus.modules[0].chapters[0].status = 'complete';
    console.log('this.courseStatus.modules[0]', this.courseStatus.modules[0].chapters[0].watchedDuration, this.videoDetail.duration)
    this.course.modules.forEach(module => {
      if(module.serialNumber === this.courseStatus.modules[0].serialNumber) {
        module.chapters.forEach(chapter => {
          if(chapter.serialNumber === this.courseStatus.modules[0].chapters[0].serialNumber) {
            chapter.status = 'complete';
          }
          if(chapter.status !== 'complete') {
            isChapterCompleted = false;
          }
        });
        if(isChapterCompleted) {
          module.status = 'complete';
          this.courseStatus.modules[0].status = 'complete';
        }
        if(module.status !== 'complete') {
          isModuleCompleted = false;
        }
      }
    });
    if(isModuleCompleted) {
      this.course.status = 'complete';
      this.courseStatus.status = 'complete';
    }

    this.updateProgress();
    this.videoEnded.emit();
  }

  updateProgress() {
    this.dashboardApi.updateVideoStatus(this.courseStatus).subscribe(data => {
      console.log('status updated', this.videoDetail.watchedDuration);
    });
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  changeVideo(course: ICourseDetail, courseStatus: ICourseStatus, chapter: IChapter) {
    this.course = course;
    this.courseStatus = courseStatus;
    this.videoDetail = chapter;
    //this.videoDetail.watchedDuration = this.player.currentTime() || 0;
    this.player.src({ src: this.videoDetail.resourceUrl, type: 'video/mp4'});
    this.player.poster(this.videoDetail.poster);
    this.player.load();
    console.log('this.videoDetail.watchedDuration --', this.videoDetail, this.videoDetail.watchedDuration)
    this.player.currentTime(this.videoDetail.watchedDuration);
    this.player.play()!.catch(error => {
      if (error.name === 'NotAllowedError') {
        // Inform the user that they need to interact with the document to play the video
        console.log('Please interact with the document to play the video.');
      }
    });
  }
}