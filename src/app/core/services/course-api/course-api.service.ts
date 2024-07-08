import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSuccess } from '@app/shared/models/api.model';
import { ICourseDetail } from '@app/shared/models/course-item.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const COURSE_API_PATH = `${environment.apiEndpointTemplate}/lmscourse`
  .replace('{{api-gateway}}', environment.lmsCourseApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const COURSE_GETALL_COURSE_CACHE_KEY = 'com.tekcapzule.course.allcourses';
@Injectable({
  providedIn: 'root',
})
export class CourseApiService {
  courses: ICourseDetail[] = [];

  constructor(private httpClient: HttpClient) {}

  getCourseApiPath(): string {
    return COURSE_API_PATH;
  }

  getAllCourse(): Observable<ICourseDetail[]> {
    return this.httpClient.post<ICourseDetail[]>(
      `${COURSE_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: COURSE_GETALL_COURSE_CACHE_KEY,
        },
      }
    );
  }

  getCourse(courseIds: string[]): Observable<ICourseDetail[]> {
    return this.httpClient.post<ICourseDetail[]>(`${COURSE_API_PATH}/get`,{courseIds});
  }

  getActiveCourse(): Observable<ICourseDetail[]> {
    return this.httpClient.post<ICourseDetail[]>(`${COURSE_API_PATH}/getAll`,{});
  }


  getCompletedCourse(): Observable<ICourseDetail[]> {
    return this.httpClient.post<ICourseDetail[]>(`${COURSE_API_PATH}/getAll`,{});
  }

  getWishlistCourse(): Observable<ICourseDetail[]> {
    return this.httpClient.post<ICourseDetail[]>(`${COURSE_API_PATH}/getAll`,{});
  }

  updateRecommendCount(courseId: string): Observable<ApiSuccess> {
    return this.httpClient
      .post<ApiSuccess>(`${COURSE_API_PATH}/recommend`, { courseId });
  }
}
