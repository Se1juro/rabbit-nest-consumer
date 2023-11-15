import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { UsersRepository } from '../../repositories/users.repository';
import { Users } from '../../schema/users.schema';
import { FlattenMaps, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

describe('UsersService', () => {
  let userService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: getModelToken(Users.name),
          useValue: Model,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  it('should save a user', async () => {
    const mockUser = {
      name: 'Test User',
      _id: '65546b8dd129003c4ee2f21a',
      __v: 0,
    };

    const userCreateSpyOn = jest
      .spyOn(usersRepository, 'createUser')
      .mockResolvedValue(mockUser as Users);

    const result = await userService.saveUser('Test User');
    expect(result.name).toEqual('Test User');
    expect(userCreateSpyOn).toHaveBeenCalled();
  });

  it('should get all users', async () => {
    const mockUsers = [
      {
        name: 'Test User',
        _id: new ObjectId('65546b8dd129003c4ee2f21a'),
        __v: 0,
      },
      {
        name: 'Test User 1',
        _id: new ObjectId('65546b8dd129003c4ee2f21b'),
        __v: 0,
      },
      {
        name: 'Test User 2',
        _id: new ObjectId('65546b8dd129003c4ee2f21c'),
        __v: 0,
      },
    ];
    jest
      .spyOn(usersRepository, 'getAllUsers')
      .mockResolvedValue(
        mockUsers as (FlattenMaps<Users> & { _id: ObjectId })[],
      );

    const result = await userService.getAllUsers();
    expect(result).toEqual(mockUsers);
  });
});
