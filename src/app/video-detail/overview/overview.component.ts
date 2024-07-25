import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICourseDetail } from '@app/shared/models/course-item.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() course: ICourseDetail;

  constructor(private router: Router) {}

  openLink(page: string) {
    this.router.navigateByUrl(`lms/${page}/${this.course.courseId}`);
  }
}
