import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChapter, ICourseDetail } from '@app/shared/models/course-item.model';
import { ICourseStatus } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  @Input() course: ICourseDetail;
  @Input() courseStatus: ICourseStatus;
  @Output() videoChange = new EventEmitter<IChapter>();
  math = Math;
  
  constructor() {}

  ngOnInit(): void {
  }

  onChangeVideo(video: IChapter) {
    console.log('video ', video)
    this.videoChange.emit(video);
  }

}
