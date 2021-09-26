import { User } from '@photo-service/contracts';
import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_:any, args:Pick<User, 'email'> & {secret: string}) => {
      const { email, secret } = args;

      const user = await prisma.user({ email });

      if (user?.loginSecret === secret) {
        try {
          await prisma.updateUser({ where: { id: user.id }, data: { loginSecret: '' } });
        } catch (error) {
          //
        }
        return generateToken(user.id);
      }

      throw Error('Wrong email/secret combination');
    },
  },
};
