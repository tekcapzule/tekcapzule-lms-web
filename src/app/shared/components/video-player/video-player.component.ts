import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import { DashboradApiService } from '@app/core';
import { IChapter, ICourseDetail } from '@app/shared/models';
import { ICourseStatus, IStatus } from '@app/shared/models/user-item.model';
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
  previousSaved: number;
  @Input() course: ICourseDetail;
  @Input() courseStatus: ICourseStatus;
  @Input() moduleIndex = 0;
  @Input() chapterIndex = 0;
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

  pauseVideo() {
    if(this.player) {
      this.player.pause();
    }
  }

  onTimeupdate(data: any) {
    this.courseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].watchedDuration = this.player.currentTime() || 0;
    //console.log('this.videoDetail.watchedDuration  ', Math.floor(this.videoDetail.watchedDuration))
    const duration = Math.floor(this.player.currentTime() || 0);
    if(this.previousSaved !== duration && duration % 120 === 0) {
      this.previousSaved = duration;
      this.updateProgress();
    }
  }

  onVideoEnded() {
    let isModuleCompleted = true;
    let isChapterCompleted = true;
    console.log("onVideoEnded   ", this.player.currentTime(), parseInt(this.videoDetail.duration));
    this.courseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].watchedDuration = parseInt(this.videoDetail.duration);
    this.courseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].status = IStatus.COMPLETED;
    //console.log('this.courseStatus.modules[0]', this.courseStatus.modules[this.moduleIndex].chapters[this.moduleIndex].watchedDuration, this.videoDetail.duration)
    let chapterDuration = 0;
    let moduleDuration = 0;
    this.courseStatus.modules.forEach(module => {
      if(module.serialNumber === this.courseStatus.modules[this.moduleIndex].serialNumber) {
        module.chapters.forEach(chapter => {
          chapterDuration += chapter.watchedDuration || 0;
          if(chapter.status !== IStatus.COMPLETED) {
            isChapterCompleted = false;
            isModuleCompleted = false;
          }
        });
        if(isChapterCompleted) {
          module.status = IStatus.COMPLETED;
        }
        module.watchedDuration = chapterDuration;
        moduleDuration += chapterDuration;
      }
    });
    if(isModuleCompleted) {
      this.courseStatus.status = IStatus.COMPLETED;
    }
    this.courseStatus.watchedDuration = moduleDuration;

    this.updateProgress();
    this.videoEnded.emit();
  }

  updateProgress() {
    /*this.dashboardApi.updateVideoStatus(this.courseStatus).subscribe(data => {
      console.log('status updated', this.videoDetail.watchedDuration);
    });*/
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  changeVideo(course: ICourseDetail, chapter: IChapter) {
    this.course = course;
    this.videoDetail = chapter;
    //this.videoDetail.watchedDuration = this.player.currentTime() || 0;
    this.player.src({ src: this.videoDetail.resourceUrl, type: 'video/mp4'});
    this.player.poster(this.videoDetail.coverImageUrl);
    this.player.load();
    this.player.volume(0);
    let watchedDuration = this.courseStatus.modules[this.moduleIndex].chapters[this.chapterIndex].watchedDuration || 0;
    console.log('this.videoDetail.watchedDuration --', this.videoDetail, watchedDuration)
    this.player.currentTime(watchedDuration);
    
    this.player.play()!.catch(error => {
      if (error.name === 'NotAllowedError') {
        // Inform the user that they need to interact with the document to play the video
        console.log('Please interact with the document to play the video.');
      }
    });
  }
}