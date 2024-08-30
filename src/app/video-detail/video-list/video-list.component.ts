import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '@app/core/services/common/helper.service';
import { IChapter, ICourseDetail, IModule } from '@app/shared/models/course-item.model';
import { ICourseStatus, IStatus, PAGE_TYPE } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  @Input() course: ICourseDetail;
  @Input() currentPage:  PAGE_TYPE;
  @Input() courseStatus: ICourseStatus;
  @Input() moduleIndex = 0;
  @Input() chapterIndex = 0;
  @Output() videoSelect = new EventEmitter<any>();
  @Output() playQuiz = new EventEmitter<IModule>();
  @Output() playAssessment = new EventEmitter();
  math = Math;
  completedQuizCount = 0;
  progress = 0;
  completedCount = 0;
  openedIndex: number | null = null;

  constructor(private helperService: HelperService) {}

  toggleAccordion(index: number): void {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
  ngOnInit(): void {
    this.updateProgress();
  }
  
  updateProgress() {
    this.progress = this.helperService.getProgress(this.courseStatus, this.course);
  }

  
  onChangeVideo(module: IModule, chapter: IChapter, moduleIndex: number, chapterIndex: number): void { 
    this.videoSelect.emit({module, chapter, moduleIndex, chapterIndex});
  }

  openQuiz(module: IModule) {
    this.playQuiz.emit(module);
  }

  openAssessment() {
    this.playAssessment.emit();
  }

}
