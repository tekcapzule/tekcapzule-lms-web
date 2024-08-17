import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IChapter, ICourseDetail, IModule } from '@app/shared/models/course-item.model';
import { ICourseStatus } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  @Input() course: ICourseDetail;
  @Input() courseStatus: ICourseStatus;
  @Output() videoSelect = new EventEmitter<any>();
  @Output() playQuiz = new EventEmitter<number>();
  @Output() playAssessment = new EventEmitter();
  math = Math;
  completedQuizCount = 0;
  
  constructor() {}

  ngOnInit(): void {
    console.log('courseStatus', this.courseStatus);
  }

  onChangeVideo(module: IModule, chapter: IChapter) {
    this.videoSelect.emit({module, chapter});
  }

  openQuiz(moduleIndex: number) {
    this.playQuiz.emit(moduleIndex);
  }

  openAssessment() {
    this.playAssessment.emit();
  }

}
