import { User } from '@prisma/client';
import { SystemEvent } from '../interfaces/system_events.interface';

export const SYSTEM_EVENTS = {
  USERS: {
    USER_CREATED: 'events.users.user-created',
  },
};

export class UserCreatedEvent extends SystemEvent<User> {
  constructor(public readonly payload: User) {
    super(SYSTEM_EVENTS.USERS.USER_CREATED, payload);
  }
}
