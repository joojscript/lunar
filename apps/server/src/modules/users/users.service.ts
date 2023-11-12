import { UserCreatedEvent } from '@/globals/constants/events';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);

  constructor(
    private readonly repository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.repository.findOne(userWhereUniqueInput);
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.repository.findMany(params);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const createdUser = await this.repository.create(data);
      this.emitCreatedUser(createdUser);
      return createdUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
        if (error.code === 'P2002' /* Unique constraint failed */) {
          return await this.handleExistingUser(data);
        }
      }
      this.logger.warn('HANDLED:', error);
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return this.repository.update(params);
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.repository.delete(where);
  }

  private emitCreatedUser(user: User) {
    const event = new UserCreatedEvent(user);
    this.eventEmitter.emit(event.metadata.eventName, event.payload);
  }

  private async handleExistingUser(data: Prisma.UserCreateInput) {
    this.logger.warn(
      `User with email ${data.email} already exists, sending OTP code`,
    );
    const fetchedUser = await this.findOne({ email: data.email });
    this.emitCreatedUser(fetchedUser);
    return fetchedUser;
  }
}
