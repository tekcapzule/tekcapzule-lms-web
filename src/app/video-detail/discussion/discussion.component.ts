import { Component, Input, OnInit } from '@angular/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  @Input() course: ICourseDetail;

  constructor(
  ) {}

  ngOnInit(): void {
  }

}
