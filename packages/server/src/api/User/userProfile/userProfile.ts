import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    userProfile: async (_:undefined, __: any, { request, isAuthenticated }:any) => {
      isAuthenticated(request);

      const { user } = request;

      // return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
      const userProfile = await prisma.user({ id: user.id });

      return userProfile;
    },
  },

};
