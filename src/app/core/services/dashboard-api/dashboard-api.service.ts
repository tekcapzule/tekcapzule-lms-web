import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ITaskItem } from '@app/shared/models/task-item.model';
import { ICourseStatus, IUser } from '@app/shared/models/user-item.model';

import { Observable } from 'rxjs';
import { AuthStateService } from '../app-state/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class DashboradApiService {
  
  constructor(private httpClient: HttpClient, private authState: AuthStateService) {}

  getAllTask(): Observable<ITaskItem[]> {
    return this.httpClient.get<ITaskItem[]>('/assets/json/task.json');
  }

  
  getUserDetails(): Observable<IUser> {
    return this.httpClient.post<IUser>(
      'https://aj4w1i4vdc.execute-api.us-east-1.amazonaws.com/dev/lms/user/get',
      {
        "userId": this.authState.getEmail(),
        "tenantId": ""
      });
  }

  updateVideoStatus(courseStatus: ICourseStatus) {
    return this.httpClient.post<any>(
      'https://aj4w1i4vdc.execute-api.us-east-1.amazonaws.com/dev/lms/user/updateActivity',
      {
        userId: this.authState.getEmail(),
        tenantId: "",
        course: courseStatus
      });  
  }
  
  enrollCourse(courseId: string) {
    return this.httpClient.post<any>(
      'https://aj4w1i4vdc.execute-api.us-east-1.amazonaws.com/dev/lms/user/optin',
      {
        userId: this.authState.getEmail(),
        tenantId: "",
        coursesId: courseId
      });  
  }
}
