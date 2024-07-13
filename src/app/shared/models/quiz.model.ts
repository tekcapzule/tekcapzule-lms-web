export interface IOption {
  id: number;
  name: string;
}

export interface IQuestion {
  question: string;
  options: IOption[];
  answer: number;
}
