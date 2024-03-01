
export interface ICourseDetail {
  learningMaterialId: string;
  topicCode: string;
  title: string;
  summary: string;
  description: string;
  authors: string[];
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
}
export interface ISchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}