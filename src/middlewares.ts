import { User } from '../typings/User';

export const isAuthenticated = (request: {user: User}):void => {
  if (!request?.user) {
    throw Error('Not authorized action');
  }
};
