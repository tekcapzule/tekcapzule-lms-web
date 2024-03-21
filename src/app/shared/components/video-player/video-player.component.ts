import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import { IVideoDetail } from '@app/shared/models';
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
  videoDetail: IVideoDetail;
  player: Player;
  isVideoStarted: boolean;
  @Output() playerReady = new EventEmitter();
  @Output() videoEnded = new EventEmitter();
  constructor(
    private elementRef: ElementRef,
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
  }

  onVideoEnded() {
    this.videoDetail.completed = true;
    this.videoEnded.emit();
  }
  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  changeVideo(videoDetail: IVideoDetail) {
    if(this.videoDetail) {
      this.videoDetail.watchedDuration = this.player.currentTime() || 0;
    }
    this.videoDetail = videoDetail;
    this.player.src({ src: this.videoDetail.src, type: 'video/mp4'});
    this.player.poster(this.videoDetail.poster);
    this.player.load();
    if(!this.videoDetail.completed) {
      this.player.currentTime(this.videoDetail.watchedDuration);
    }
    this.videoDetail.completed = false;
    this.player.play()!.catch(error => {
      if (error.name === 'NotAllowedError') {
        // Inform the user that they need to interact with the document to play the video
        console.log('Please interact with the document to play the video.');
      }
    });
  }
}