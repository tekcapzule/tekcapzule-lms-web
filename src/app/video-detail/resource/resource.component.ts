import { Component, Input, OnInit } from '@angular/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  @Input() course: ICourseDetail;

  constructor(
  ) {}

  ngOnInit(): void {
  }

}
