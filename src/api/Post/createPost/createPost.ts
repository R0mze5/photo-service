import { prisma } from '../../../../generated/prisma-client';
import { Post } from '../../../../typings/Post';

export default {
  Mutation: {
    createPost: async (_: undefined, args: Post, { request, isAuthenticated }:any) => {
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
