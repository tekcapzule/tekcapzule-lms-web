
export interface ICourseDetail {
  courseId: string;
  topicCode: string;
  courseRating: number;
  title: string;
  summary: string;
  description: string;
  authors: IAuthorDetail[];
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
  status?: string;
  publishedOn: string;
  topicName?: string;
  isRecommended?: boolean;
  watchedDuration: number;
  quiz: IQuiz;
  faq: IFAQ[];
}

export interface IQuiz {
  quizId: string;
  questions: IQuestion[];
}

export interface IQuestion {
  questionId: string;
  questionText: string;
  options: IOption[];
}

export interface IOption {
  id: string;
  name: string;
}

export interface IFAQ {
  qus: string;
  ans: string;
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
  status: string;
  description: string;
  objective: string[];
  assement: number;
  chapters: IChapter[];
  quiz: number;
  coverImageUrl: string;
}
export interface IChapter {
  serialNumber: number;
  title: string;
  name: string;
  src: string;
  resourceUrl?: string;
  duration: number;
  watchedDuration: number;
  status: string;
  completed: boolean;
  poster?: string;
  coverImageUrl: string;
}
export interface ISchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}