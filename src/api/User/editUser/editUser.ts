import { prisma } from '../../../../generated/prisma-client';
import { User } from '../../../../typings/User';

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
