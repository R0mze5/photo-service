import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchUser: async (_:unknown, args: {term:string}) => {
      const { term } = args;
      try {
        const users = await prisma.users({
          where: {
            OR: [
              { userName_contains: term },
              { firstName_contains: term },
              { lastName_contains: term },
            ],
          },
        });
        return users;
      } catch (error) {
        return [];
      }
    },
  },
};
