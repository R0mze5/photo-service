import { prisma } from '../../../../generated/prisma-client';
import { User } from '../../../../typings/User';

export default {
  Mutation: {
    createAccount: async (_:any, args:User) => {
      const {
        userName, email, firstName = '', lastName = '', bio = '', avatar,
      } = args;
      const user = await prisma.createUser({
        userName, email, firstName, lastName, bio, avatar,
      });

      return user;
    },
  },
};
