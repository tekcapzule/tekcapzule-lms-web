import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateCourseTime();  
  }

  updateCourseTime() {
    this.course.duration = 0;
    this.course.modules.forEach(module => {
      module.chapters.forEach(chapter => {
        this.course.duration += +chapter.duration;
      });
    });
    this.formattedDuration = this.getFormattedDuration(this.course.duration);
    //console.log('this.course.duration  ', this.course.duration, this.course.watchedDuration);
  }

  getFormattedDuration(duration: number): string {
    const minutes = Math.round(duration % 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}hr ${minutes}min`;
  }

  openLink() {
    this.openAssessment.emit();
  }
}
