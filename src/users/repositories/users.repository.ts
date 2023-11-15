import { Injectable } from '@nestjs/common';
import { Users } from '../schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async createUser(name: string): Promise<Users> {
    return this.usersModel.create({ name });
  }

  async getAllUsers() {
    return this.usersModel.find({}, { __v: 0 }).lean().exec();
  }
}
