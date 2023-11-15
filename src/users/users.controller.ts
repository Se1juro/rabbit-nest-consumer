import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern({ cmd: 'create-users' })
  async createUsers(@Payload() name: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const userCreated = await this.userService.saveUser(name);

    if (userCreated) channel.ack(originalMsg);

    return userCreated;
  }

  @MessagePattern({ cmd: 'get-all-users' })
  getUsers(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const users = this.userService.getAllUsers();
    if (users) channel.ack(originalMsg);
    return users;
  }

  @Get('')
  getUsersDirectly() {
    return this.userService.getAllUsers();
  }
}
