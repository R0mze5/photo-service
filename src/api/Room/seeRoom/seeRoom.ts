import { prisma } from '../../../../generated/prisma-client';
import { RoomId } from '../../../../typings/Room';
import { User } from '../../../../typings/User';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    seeRoom: (_:undefined, args: {id: RoomId}, { request, isAuthenticated }:any) => {
      isAuthenticated(request);
      const user: User = request?.user;

      const canSee = prisma.$exists.room({
        participants_some: { id: user.id },
        id: args.id,
      });

      if (!canSee) {
        throw Error('Forbidden');
      }

      return prisma.room({
        id: args.id,
      }).$fragment(ROOM_FRAGMENT);
    },
  },
};
