import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async saveUser(name: string) {
    return await this.userRepository.createUser(name);
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }
}
