import { prisma } from '../../../../generated/prisma-client';
import { generateSecret, sendSecretMail } from '../../../utils';

export default {
  Mutation: {
    requestSecret: async (_:unknown, args:{email:string}) => {
      const { email } = args;
      const loginSecret = generateSecret();

      console.log(loginSecret);

      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({
          data: {
            loginSecret,
          },
          where: { email },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
