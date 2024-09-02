import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '@app/core/services/common/helper.service';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ICourseStatus } from '@app/shared/models/user-item.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() course: ICourseDetail;
  @Input() courseStatus: ICourseStatus;
  @Output() openAssessment = new EventEmitter();
  formattedDuration: string;

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
    this.formattedDuration = this.helperService.updateCourseTime(this.course);
  }

  openLink() {
    this.openAssessment.emit();
  }
}
