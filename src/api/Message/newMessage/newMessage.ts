import { prisma } from '../../../../generated/prisma-client';
import { Message } from '../../../../typings/Message';
import { UserId } from '../../../../typings/User';

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
