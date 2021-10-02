import { UserName } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    userDetails: async (_:undefined, args:{username:UserName}) => {
      const { username } = args;

      const user = await prisma.user({ userName: username });

      return user;
    },
  },
};
