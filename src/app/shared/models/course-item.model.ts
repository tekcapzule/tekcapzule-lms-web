
export interface ICourseDetail {
  courseId: string;
  learningMaterialId: string;
  topicCode: string;
  title: string;
  summary: string;
  description: string;
  authors: IAuthorDetail[];
  author: string;
  tags: string[];
  publisher: string;
  duration: any;
  level: string;
  courseLevel: string;
  courseUrl: string;
  modules: IModule[];
  prizingModel: string;
  deliveryMode: string;
  learningMode: string;
  imageUrl: string;
  promotion: ICoursePromotion;
  recommendations: number;
  status: string;
  publishedOn: string;
  topicName?: string;
  isRecommended?: boolean;
  faq: IFAQ[];
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
  title: ISchedule;
  name: string;
  duration: any;
  description: string;
  objective: string[];
  assement: number;
  videos: IVideoDetail[];
  chapters: IChapter[];
  quiz: number;
  imageUrl: string;
}
export interface IChapter {
  title: string;
  src: string;
  name: string;
  duration: number;
  watchedDuration: number;
  completed: boolean;
  poster?: string;
}
export interface IVideoDetail {
  title: string;
  src: string;
  resourceUrl?: string;
  duration: number;
  watchedDuration: number;
  completed: boolean;
  poster?: string;
}
export interface ISchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}