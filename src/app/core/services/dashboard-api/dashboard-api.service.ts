import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ITaskItem } from '@app/shared/models/task-item.model';
import { IUser } from '@app/shared/models/user-item.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboradApiService {
  
  constructor(private httpClient: HttpClient) {}

  getAllTask(): Observable<ITaskItem[]> {
    return this.httpClient.get<ITaskItem[]>('/assets/json/task.json');
  }

  
  getUserDetails(): Observable<IUser> {
    return this.httpClient.post<IUser>(
      'https://aj4w1i4vdc.execute-api.us-east-1.amazonaws.com/dev/lms/user/get',
      {
        "userId": "06.prerna@gmail.com",
        "tenantId": ""
      });
  }
}
