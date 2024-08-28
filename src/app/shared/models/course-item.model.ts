import { IStatus } from "./user-item.model";

export interface ICourseDetail {
  courseId: string;
  topicCode: string;
  courseRating: number;
  title: string;
  summary: string;
  description: string;
  //authors: IAuthorDetail[];
  author: string;
  tags: string[];
  publisher: string;
  duration: any;
  courseLevel: string;
  courseUrl: string;
  modules: IModule[];
  prizingModel: string;
  deliveryMode: string;
  learningMode: string;
  coverImageUrl: string;
  promotion: ICoursePromotion;
  recommendations: number;
  status?: IStatus;
  publishedOn: string;
  topicName?: string;
  isRecommended?: boolean;
  watchedDuration: number;
  quiz: IQuiz;
  assessment: IQuiz; 
  faqs: IFAQ[];
  learningObjectives: string[];
  preRequisites: any[];
  targetedAudiences: string[];
  announcements: IAnnouncements[];
  resources: IResources[];
}

export interface IAnnouncements {
  imageUrl: string;
  summary: string;
  title: string;
  author: string;
  date: string;
}

export interface IResources {
  imageUrl: string;
  coverImageUrl: string;
  summary: string;
  title: string;
  resourceUrl: string;
}

export interface IQuiz {
  quizId: string;
  questions: IQuestion[];
}

export interface IQuestion {
  questionId: string;
  questionText: string;
  options: IOption[];
  correctAnswer: string[];
}

export interface IOption {
  id: string;
  name: string;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface IAuthorDetail {
  name: string;
  title: string;
}

export interface ICoursePromotion {
  promoted: boolean;
  endsOnUtc: string;
  imageUrl: string;
  campaignUrl: string;
}
export interface IModule {
  serialNumber: number;
  title: ISchedule;
  name: string;
  duration: any;
  watchedDuration: number;
  status: IStatus;
  description: string;
  objective: string[];
  assement: number;
  chapters: IChapter[];
  quiz: IQuiz;
  coverImageUrl: string;
}
export interface IChapter {
  serialNumber: number;
  title: string;
  name: string;
  src: string;
  resourceUrl: string;
  duration: any;
  watchedDuration: number;
  status: IStatus;
  coverImageUrl: string;
  chapterType: IChapterType;
}

export enum IChapterType {
  VIDEO_CONTENT = 'VIDEO_CONTENT',
  PDF_CONTENT = 'PDF_CONTENT'
}

export interface ISchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}