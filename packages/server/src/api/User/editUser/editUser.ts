import { User } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editUser: (_:any, args:User, { request, isAuthenticated }:any) => {
      isAuthenticated(request);
      const user: User = request?.user;

      const {
        userName, email, firstName = '', lastName = '', bio = '', avatar,
      } = args;
      return prisma.updateUser({
        where: { id: user?.id },
        data: {
          userName, email, firstName, lastName, bio, avatar,
        },
      });
    },
  },
};
