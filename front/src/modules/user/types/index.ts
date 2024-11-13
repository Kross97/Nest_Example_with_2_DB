export interface IUser {
  createdAt: string;
  id: number;
  login: string;
  name: {
    first: string;
    last: string;
  }
  password: string;
  test: string;
  rentCars: any[]
}

export interface IUSerRequest {
  id?: number;
  login: string;
  nameFirst: string;
  nameLast: string;
  password: string;
  test?: string;
}