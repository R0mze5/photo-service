import { User, UserId } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';

import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    unfollowUser: async (_: unknown, args: {id: UserId}, { request }:any) => {
      isAuthenticated(request);
      const user: User = request?.user;
      const { id } = args;

      if (id === user.id) {
        throw Error('Forbidden');
      }

      try {
        await prisma.updateUser({
          where: { id: user?.id },
          data: {
            following: {
              disconnect: { id },
            },
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
