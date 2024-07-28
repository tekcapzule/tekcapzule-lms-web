import { Component, Input, OnInit } from '@angular/core';
import { IAnnouncements, ICourseDetail } from '@app/shared/models/course-item.model';

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
  }

}
