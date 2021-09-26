import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    postDetails: async (_:undefined, args:{postId: string}) => {
      const { postId } = args;

      const post = await prisma.post({ id: postId });

      return post;
    },
  },
};
