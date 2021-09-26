import { User } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    getFeed: async (_:unknown, args: {}, { request, isAuthenticated }:any) => {
      isAuthenticated(request);
      const user: User = request?.user;

      const following = await prisma.user({ id: user.id }).following();

      const userIds = following.map((followingUser) => followingUser.id);
      userIds.push(user.id);

      try {
        const posts = await prisma.posts({
          where: {

            user: { id_in: userIds },
          },
          // orderBy: 'createdAt_DESC',
        });

        return posts;
      } catch (error) {
        return [];
      }
    },
  },
};
