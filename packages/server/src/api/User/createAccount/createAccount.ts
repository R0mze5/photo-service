import { User } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createAccount: async (_:any, args:User) => {
      const {
        userName, email, firstName = '', lastName = '', bio = '', avatar,
      } = args;

      const isUserExists = await prisma.$exists.user({ email });

      if (isUserExists) {
        throw Error('Account already exists, try to log in');
      }

      const isUsernameExists = await prisma.$exists.user({ userName });

      if (isUsernameExists) {
        throw Error('This username already taken');
      }

      try {
        await prisma.createUser({
          userName, email, firstName, lastName, bio, avatar,
        });
      } catch (error) {
        return false;
      }

      return true;
    },
  },
};
