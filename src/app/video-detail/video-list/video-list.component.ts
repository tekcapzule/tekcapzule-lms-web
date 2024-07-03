import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  math = Math;
  
  constructor() {}

  ngOnInit(): void {
  }

  onChangeVideo(module: IModule, chapter: IChapter) {
    console.log('chapter ', chapter)
    this.videoSelect.emit({module, chapter});
  }

}
