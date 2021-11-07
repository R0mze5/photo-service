import { PostCreate } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createPost: async (_: undefined, args: PostCreate, { request, isAuthenticated }:any) => {
      isAuthenticated(request);

      const { caption = '', location = '', files } = args;

      const post = await prisma.createPost({
        caption, location, user: { connect: { id: request.user.id } },
      });

      files.forEach(async (file) => {
        await prisma.createFile({ url: file, post: { connect: { id: post.id } } });
      });
      return post;
    },
  },
};
