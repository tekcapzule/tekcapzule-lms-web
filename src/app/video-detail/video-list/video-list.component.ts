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
  @Output() playQuiz = new EventEmitter<IModule>();
  @Output() playAssessment = new EventEmitter();
  quizStatus: any = {};
  math = Math;
  completedQuizCount = 0;
  
  constructor() {}

  ngOnInit(): void {
    this.courseStatus.modules.forEach(module => {
      this.quizStatus[module.serialNumber] = module.quizStatus;
    });
    console.log('quizStatus', this.courseStatus, this.quizStatus);
  }

  onChangeVideo(module: IModule, chapter: IChapter) {
    this.videoSelect.emit({module, chapter});
  }

  openQuiz(module: IModule) {
    this.playQuiz.emit(module);
  }

  openAssessment() {
    this.playAssessment.emit();
  }

}
