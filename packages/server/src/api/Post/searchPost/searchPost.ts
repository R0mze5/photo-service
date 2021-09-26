import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchPost: async (_:unknown, args: {term:string}) => {
      const { term } = args;
      try {
        const posts = await prisma.posts({
          where: {
            OR: [
              { location_starts_with: term },
              { caption_starts_with: term },
            ],
          },
        });
        return posts;
      } catch (error) {
        return [];
      }
    },
  },
};
