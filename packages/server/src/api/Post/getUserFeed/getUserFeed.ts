import { PostId } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    getUserFeed: async (_:unknown, args: {id:PostId}) => {
      const { id } = args;
      try {
        const posts = await prisma.posts({
          where: {
            user: { id },
          },
        });
        return posts;
      } catch (error) {
        return [];
      }
    },
  },
};
