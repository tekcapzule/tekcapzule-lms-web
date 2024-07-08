
export interface IUser {
  userId: string;
  tenantId: string;
  emailId: string;
  firstName: string;
  lastName: string;
  enrollments: IEnrollment[];
  points: number;
}

export interface IEnrollment {
  courseId: string;
  enrollmentStatus: string;
  enrollmentDate: string;
  course: ICourseStatus;
}

export interface ICourseStatus {
  courseId: string;
  watchedDuration: number;
  status: string;
  modules: IModuleStatus[];
  lastVisitedChapter: number;
  lastVisitedModule: number;
}

export interface IModuleStatus {
  serialNumber: number;
  watchedDuration: number;
  status: string;
  chapters: IChapterStatus[];
}

export interface IChapterStatus {
  serialNumber: number;
  watchedDuration: number;
  status: string;
}