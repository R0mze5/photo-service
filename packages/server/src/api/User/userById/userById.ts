import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    userById: async (_:undefined, args:{id:string}) => {
      const { id } = args;

      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts;

      return { user, posts };
    },
  },
};
