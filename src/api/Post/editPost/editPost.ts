import { prisma } from '../../../../generated/prisma-client';
import { Post } from '../../../../typings/Post';
import { User } from '../../../../typings/User';

export default {
  Mutation: {
    editPost: async (_: undefined, args: Post & {action?: 'EDIT' | 'DELETE'}, { request, isAuthenticated }:any) => {
      isAuthenticated(request);
      const user: User = request?.user;

      const {
        id, caption, location, action,
      } = args;

      const post = await prisma.$exists.post({ id, user: { id: user.id } });

      if (post) {
        if (action === 'EDIT' || !action) {
          return prisma.updatePost({
            where: { id },
            data: {
              caption, location, user: { connect: { id: request.user.id } },
            },
          });
        }

        if (action === 'DELETE') {
          // await prisma.deleteManyLikes({ post: { id } });
          return prisma.deletePost({
            id,
          });
        }
      }

      throw Error('Forbidden');
    },
  },
};
