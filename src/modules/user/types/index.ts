export interface IUserRequest {
  nameFirst: string;
  nameLast: string;
  password: string;
  login: string;
  role: {id: number; role: string};
}