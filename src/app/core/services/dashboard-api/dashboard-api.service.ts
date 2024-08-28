import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { ITaskItem } from '@app/shared/models/task-item.model';
import { ICourseStatus, IUser } from '@app/shared/models/user-item.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { AuthStateService } from '../app-state/auth-state.service';

const COURSE_API_PATH = `${environment.apiEndpointTemplate}/lms/user/`
  .replace('{{api-gateway}}', environment.lmsCourseUpdateApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

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
      COURSE_API_PATH + 'get',
      {
        "userId": this.authState.getEmail(),
        "tenantId": ""
      });
  }

  updateVideoStatus(courseStatus: ICourseStatus) {
    return this.httpClient.post<any>(
      COURSE_API_PATH + 'updateProgress',
      {
        userId: this.authState.getEmail(),
        tenantId: "",
        course: courseStatus
      });  
  }
  
  enrollCourse(courseId: string) {
    return this.httpClient.post<any>(
      COURSE_API_PATH + 'optin',
      {
        userId: this.authState.getEmail(),
        tenantId: "",
        courseId: courseId
      });  
  }

  courseComplete(courseDetail: any) {
    return this.httpClient.post<any>(
      COURSE_API_PATH + 'coursecomplete',
      {
        userId: this.authState.getEmail(),
        tenantId: "",
        course: courseDetail
      });  
  }
}
