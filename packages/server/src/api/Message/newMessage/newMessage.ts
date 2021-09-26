import { Message, UserId } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Subscription: {
    newMessage: {
      subscribe: (_:undefined, args: {userId: UserId }) => {
        const { userId } = args;
        return prisma.$subscribe.message({
          AND: [
            { mutation_in: ['CREATED'] },
            {
              node: {
                recipient: {
                  id: userId,
                },
              },
            },
          ],
        }).node();
      },
      resolve: (payload:Message) => payload,
    },
  },
};
