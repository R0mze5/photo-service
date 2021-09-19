import { prisma } from '../../../../generated/prisma-client';
import { Room } from '../../../../typings/Room';
import { User, UserId } from '../../../../typings/User';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
  Mutation: {
    sendMessage: async (_:undefined, args: {
      roomId?: string, message: string, toId?: UserId
    }, { request, isAuthenticated }:any) => {
      isAuthenticated(request);
      const user: User = request?.user;

      const { roomId, message, toId } = args;

      if (!roomId && !toId) {
        throw Error('no required params');
      }

      let room: Room | undefined;

      if (typeof roomId === 'undefined' && user.id !== toId) {
        const isRoomExist = await prisma.$exists.room({
          AND: [
            { participants_some: { id: user.id } }, { participants_some: { id: toId } }],
        });

        if (isRoomExist) {
          throw Error('Room is already created. RoomId is required');
          // room = await prisma.({
          //   AND: [
          //     { participants_some: { id: user.id } },
          //     { participants_some: { id: toId } },
          //   ],
          // });
        } else {
          room = await prisma.createRoom({
            participants: {
              connect: [
                { id: toId }, { id: user.id }],
            },
          }).$fragment(ROOM_FRAGMENT);
        }
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error('Room Not Found');
      }

      const recipient = room.participants.filter(
        (participant) => participant.id !== user.id,
      )[0];

      const newMessage = await prisma.createMessage({
        text: message,
        recipient: { connect: { id: recipient.id } },
        sender: { connect: { id: user.id } },
        room: { connect: { id: room.id } },
      });

      return newMessage;
    },
  },
};
