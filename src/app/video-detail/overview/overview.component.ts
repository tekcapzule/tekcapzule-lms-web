import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ICourseStatus } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() course: ICourseDetail;
  @Input() courseStatus: ICourseStatus;
  @Output() openAssessment = new EventEmitter();

  constructor(private router: Router) {}

  openLink() {
    this.openAssessment.emit();
  }
}
