import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ITaskItem } from '@app/shared/models/task-item.model';
import * as moment from 'moment';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  
  @Input() task: ITaskItem;

  constructor(private router: Router) {}

  ngOnInit(): void {
      this.task.openedDateOn = this.task.openedDateOn ? moment(this.task.openedDateOn, 'DD/MM/YYYY').fromNow() : 'NA';
      this.task.dueDateOn = this.task.dueDateOn ? moment(this.task.dueDateOn, 'DD/MM/YYYY').fromNow() : 'NA';
  }

}
