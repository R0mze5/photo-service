import { User } from '@photo-service/contracts';
import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    posts: ({ id }: User) => prisma.user({ id }).posts(),
    following: ({ id }: User) => prisma.user({ id }).following(),
    followers: ({ id }: User) => prisma.user({ id }).followers(),
    likes: ({ id }: User) => prisma.user({ id }).likes(),
    comments: ({ id }: User) => prisma.user({ id }).comments(),
    rooms: ({ id }: User) => prisma.user({ id }).rooms(),
    followingCount: ({ id }: User) => prisma
      .usersConnection({ where: { followers_some: { id } } }).aggregate().count(),
    followersCount: ({ id }: User) => prisma
      .usersConnection({ where: { following_none: { id } } }).aggregate().count(),
    postsCount: ({ id }: User) => prisma
      .postsConnection({ where: { user: { id } } }).aggregate().count(),
    fullName: (parent: User) => `${parent.firstName} ${parent.lastName}`,
    isFollowing: (
      parent: User,
      __: any,
      { request }: { request: { user: User } },
    ) => {
      const { user } = request;

      const { id: parentId } = parent;

      return prisma.$exists.user({
        AND: [{ id: parentId }, { followers_some: { id: user.id } }],
      });
    },
    isSelf: (
      parent: User,
      __: any,
      {
        request,
      }: {
        request: { user: User };
      },
    ) => parent.id === request?.user?.id,
  },
};
