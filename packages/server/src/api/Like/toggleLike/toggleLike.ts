import { PostId, User } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';
import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    toggleLike: async (_: unknown, args: {postId: PostId}, { request }:any) => {
      isAuthenticated(request);
      const user: User = request?.user;
      const { postId } = args;

      const filterOptions = {
        AND: [
          { user: { id: user?.id } },
          { post: { id: postId } },
        ],
      };

      try {
        const isLikeExist = await prisma.$exists.like(filterOptions);

        if (isLikeExist) {
          await prisma.deleteManyLikes(filterOptions);
          return false;
        }
        await prisma.createLike({
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

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
