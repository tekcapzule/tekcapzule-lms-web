import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  chapterCount = 0;
  completedCount = 0;
  openedIndex: number | null = null;

  constructor() {}

  toggleAccordion(index: number): void {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
  ngOnInit(): void {
    this.updateProgress();
  }

  updateProgress() {
    this.chapterCount = 0;
    this.completedCount = 0;
    if(this.courseStatus && this.courseStatus.modules) { 
      this.courseStatus.modules.forEach((module, i) => {
        module.chapters.forEach(chapter => {
          this.chapterCount ++;
          if(chapter.status === IStatus.COMPLETED) {
            this.completedCount++;
          }
        });
        //QuizCount
        if(this.course.modules[i].quiz) {
          this.chapterCount ++;
          if(module.quizStatus === IStatus.COMPLETED) {
            this.completedCount++;
          }
        }
      });
      if(this.course.assessment) {
        this.chapterCount ++;
        if(this.courseStatus.assessmentStatus === IStatus.COMPLETED) {
          this.completedCount++;
        }
      }
    }
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
