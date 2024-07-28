import { Component, Input, OnInit } from '@angular/core';
import { ICourseDetail, IResources } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  @Input() course: ICourseDetail;
  resources: IResources[];

  constructor(
  ) {}

  ngOnInit(): void {
    this.resources = this.course.resources || [];
  }

  openResource(resource: IResources) {
    window.open(resource.resourceUrl, '_blank');
  }

}
