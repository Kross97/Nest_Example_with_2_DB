export interface IUser {
  createdAt: string;
  id: number;
  login: string;
  name: {
    first: string;
    last: string;
  };
  password: string;
  role: { id: number; role: string };
  test: string;
  rentCars: any[];
}

export interface IUSerRequest {
  id?: number;
  login: string;
  nameFirst: string;
  nameLast: string;
  password: string;
  role: { id: number; role: string };
  test?: string;
  car?: string;
}
