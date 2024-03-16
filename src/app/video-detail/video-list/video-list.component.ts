import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourseDetail, IVideoDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  @Input() course: ICourseDetail;
  @Output() videoChange = new EventEmitter<IVideoDetail>();
  constructor(
  ) {}

  ngOnInit(): void {
  }

  onChangeVideo(video: IVideoDetail) {
    console.log('video ', video)
    this.videoChange.emit(video);
  }

}
