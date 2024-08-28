import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DashboradApiService } from '@app/core';
import { IChapter, ICourseDetail } from '@app/shared/models';
import { ICourseStatus, IStatus } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-pdf-player',
  templateUrl: './pdf-player.component.html',
  styleUrls: ['./pdf-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PDFPlayerComponent implements OnInit, OnDestroy {
  videoDetail: IChapter;
  pdfSource: SafeResourceUrl;
  @Input() course: ICourseDetail;
  @Input() courseStatus: ICourseStatus;
  @Input() moduleIndex = 0;
  @Input() chapterIndex = 0;
  @Output() playerReady = new EventEmitter();
  @Output() videoEnded = new EventEmitter();

  constructor(
    private dashboardApi: DashboradApiService,
    private sanitizer: DomSanitizer
  ) {}

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.videoDetail = this.course.modules[this.moduleIndex].chapters[this.chapterIndex];
    this.pdfSource =this.sanitizer.bypassSecurityTrustResourceUrl(this.videoDetail.resourceUrl);
  }
  
  ngOnDestroy(): void {
    //this.onPdfEnded();
  }
  
  onPdfEnded() {
    let isModuleCompleted = true;
    let isChapterCompleted = true;
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
    this.dashboardApi.updateVideoStatus(this.courseStatus).subscribe(data => {
      console.log('status updated', this.videoDetail.watchedDuration);
    });
  }
}