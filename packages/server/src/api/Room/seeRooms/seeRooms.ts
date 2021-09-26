import { User } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';
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
