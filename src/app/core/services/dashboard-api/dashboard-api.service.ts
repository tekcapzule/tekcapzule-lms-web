import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ITaskItem } from '@app/shared/models/task-item.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboradApiService {
  constructor(private httpClient: HttpClient) {}

  getAllTask(): Observable<ITaskItem[]> {
    return this.httpClient.get<ITaskItem[]>('/assets/json/task.json');
  }
}
