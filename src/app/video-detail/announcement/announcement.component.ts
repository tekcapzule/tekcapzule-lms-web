import { Component, Input, OnInit } from '@angular/core';
import { IAnnouncements, ICourseDetail } from '@app/shared/models/course-item.model';
import * as moment from 'moment';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  @Input() course: ICourseDetail;
  announcements: IAnnouncements[];

  constructor(
  ) {}

  ngOnInit(): void {
    this.announcements = this.course.announcements || [];
    this.announcements.forEach(ann => {
      ann.date = ann.date ? moment(ann.date, 'DD/MM/YYYY').fromNow() : 'NA';
    });
  }

}
