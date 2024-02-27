import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSuccess } from '@app/shared/models/api.model';
import { ICourseDetail } from '@app/shared/models/course-item.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const COURSE_API_PATH = `${environment.apiEndpointTemplate}/course`
  .replace('{{api-gateway}}', environment.courseApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const COURSE_GETALL_COURSE_CACHE_KEY = 'com.tekcapzule.course.allcourses';
@Injectable({
  providedIn: 'root',
})
export class CourseApiService {
  constructor(private httpClient: HttpClient) {}

  getCourseApiPath(): string {
    return COURSE_API_PATH;
  }

  getAllCourse(): Observable<ICourseDetail[]> {
    return this.httpClient.get<ICourseDetail[]>('/assets/json/course.json');
  }

  getActiveCourse(): Observable<ICourseDetail[]> {
    return this.httpClient.get<ICourseDetail[]>('/assets/json/active_course.json');
  }


  getCompletedCourse(): Observable<ICourseDetail[]> {
    return this.httpClient.get<ICourseDetail[]>('/assets/json/completed_course.json');
  }

  getWishlistCourse(): Observable<ICourseDetail[]> {
    return this.httpClient.get<ICourseDetail[]>('/assets/json/course.json');
  }

  updateRecommendCount(courseId: string): Observable<ApiSuccess> {
    return this.httpClient
      .post<ApiSuccess>(`${COURSE_API_PATH}/recommend`, { courseId });
  }
}
