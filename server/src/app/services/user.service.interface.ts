import { IUser } from "../models/User";

export interface IUserService {
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(userData: Partial<IUser>): Promise<IUser>;
    findUserById(id: number): Promise<IUser | null>;
  }