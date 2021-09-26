import { User } from '@photo-service/contracts';

export const isAuthenticated = (request: {user: User}):void => {
  if (!request?.user) {
    throw Error('Not authorized action');
  }
};
