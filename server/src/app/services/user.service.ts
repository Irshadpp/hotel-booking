import User, { IUser } from "../models/User";
import { IUserService } from "./user.service.interface";

class UserService implements IUserService {
  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error: any) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async findUserById(id: number): Promise<IUser | null> {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error: any) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }
}

export default new UserService();