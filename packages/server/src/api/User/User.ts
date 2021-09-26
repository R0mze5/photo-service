import { User } from '@photo-service/contracts';
import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: (parent:User, __:any, { request }:any) => `${parent.firstName} ${parent.lastName}`,
    isFollowing: (parent:User, __:any, { request }:{request: {user: User}}) => {
      const { user } = request;

      const { id: parentId } = parent;

      return prisma.$exists.user({
        AND: [{ id: parentId }, { followers_some: { id: user.id } }],
      });
    },
    isSelf: (parent:User, __:any, { request }:{
      request: {user: User}
    }) => parent.id === request?.user?.id,

  },

};
