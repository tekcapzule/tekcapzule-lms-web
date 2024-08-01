
export interface IUser {
  userId: string;
  tenantId: string;
  emailId: string;
  firstName: string;
  lastName: string;
  enrollments: IEnrollment[];
  points: number;
  badges: any;
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
  status: IStatus;
  modules: IModuleStatus[];
  lastVisitedChapter: number;
  lastVisitedModule: number;
  quizScore: number;
  quizStatus: IStatus;
}

export enum IStatus {
  IN_PROGRESS = 'In Progress',
  ENROLLED = 'Enrolled',
  COMPLETED = 'Completed'
}

export interface IModuleStatus {
  serialNumber: number;
  watchedDuration: number;
  status: IStatus;
  chapters: IChapterStatus[];
}

export interface IChapterStatus {
  serialNumber: number;
  watchedDuration: number;
  status: IStatus;
}