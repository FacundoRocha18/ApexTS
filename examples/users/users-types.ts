export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type CreateUser = Omit<IUser, "id">;

export type PublicUser = Omit<IUser, "password">;
