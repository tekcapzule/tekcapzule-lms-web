
export interface ICourseDetail {
  learningMaterialId: string;
  topicCode: string;
  title: string;
  summary: string;
  description: string;
  authors: IAuthorDetail[];
  tags: string[];
  publisher: string;
  duration: any;
  level: string
  courseUrl: string;
  modules: Imodule[];
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
export interface Imodule {
  title: ISchedule;
  duration: string;
  description: string;
  objective: string[];
  assement: number;
  videos: number;
  quiz: number;
  imageUrl: string;
}
export interface ISchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}