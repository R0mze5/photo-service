import { PostId, User } from '@photo-service/contracts';
import { COMMENT_FRAGMENT } from '../../../fragments';
import { prisma } from '../../../../generated/prisma-client';
// import { PostId } from '../../../../typings/Post';
// import { User } from '../../../../typings/User';
import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    addComment: async (_: unknown, args: {postId: PostId, text:string}, { request }:any) => {
      isAuthenticated(request);
      const user: User = request?.user;
      const { postId, text } = args;

      try {
        const comment = await prisma.createComment({
          text,
          user: {
            connect: {
              id: user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        });

        return comment;
      } catch (error) {
        return null;
      }
    },
  },
};
