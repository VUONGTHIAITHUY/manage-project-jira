

export interface IResponse<T> {
  content: T;
  message: string;
  statusCode: number;
  dateTime: Date;
}

export interface Project {
  id: string;
  name: string;
}
