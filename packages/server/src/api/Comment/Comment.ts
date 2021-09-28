import { Comment } from '@photo-service/contracts';
import { prisma } from '../../../generated/prisma-client';

export default {
  Comment: {

    user: (parent:Comment) => prisma
      .comment({ id: parent.id })
      .user(),

  },
};
