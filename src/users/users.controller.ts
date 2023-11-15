import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UsersService } from './users.service';
import { IMessageUser } from './interfaces/messageUser.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern({ cmd: 'create-users' })
  async createUsers(@Payload() message: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const payload: IMessageUser = JSON.parse(message);

    const { name, id } = payload;

    const userCreated = await this.userService.saveUser(name);

    console.log(`Received message ${id}`);

    if (userCreated) channel.ack(originalMsg);

    return userCreated;
  }

  @MessagePattern({ cmd: 'get-all-users' })
  getUsers(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const users = this.userService.getAllUsers();

    console.log(`Received message ${JSON.stringify(originalMsg)} GET Users`);

    if (users) channel.ack(originalMsg);
    return users;
  }

  @Get('')
  getUsersDirectly() {
    return this.userService.getAllUsers();
  }
}
