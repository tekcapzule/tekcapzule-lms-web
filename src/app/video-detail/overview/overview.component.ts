import { Component, Input, OnInit } from '@angular/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() course: ICourseDetail;

  constructor(
  ) {}

  ngOnInit(): void {
  }

}
