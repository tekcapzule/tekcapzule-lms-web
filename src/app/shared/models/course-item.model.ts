
export interface ICourseDetail {
  courseId: string;
  learningMaterialId: string;
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
  level: string;
  courseLevel: string;
  courseUrl: string;
  modules: IModule[];
  prizingModel: string;
  deliveryMode: string;
  learningMode: string;
  imageUrl: string;
  coverImageUrl: string;
  promotion: ICoursePromotion;
  recommendations: number;
  status?: string;
  publishedOn: string;
  topicName?: string;
  isRecommended?: boolean;
  watchedDuration: number;
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
  serialNumber: number;
  title: ISchedule;
  name: string;
  duration: any;
  watchedDuration: number;
  status: string;
  description: string;
  objective: string[];
  assement: number;
  videos: IChapter[];
  chapters: IChapter[];
  quiz: number;
  imageUrl: string;
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
}
export interface ISchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}