import { prisma } from '../../../../generated/prisma-client';
import { User } from '../../../../typings/User';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    seeRooms: (_:undefined, args: {}, { request, isAuthenticated }:any) => {
      isAuthenticated(request);
      const user: User = request?.user;

      return prisma.rooms({
        where: {
          participants_some: { id: user.id },
        },
      }).$fragment(ROOM_FRAGMENT);
    },
  },
};
