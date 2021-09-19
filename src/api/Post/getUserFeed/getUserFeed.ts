import { prisma } from '../../../../generated/prisma-client';
import { PostId } from '../../../../typings/Post';

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
