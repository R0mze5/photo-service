import { Resolvers } from "apollo-boost";

export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false,
};

export const resolvers: Resolvers = {
  Mutation: {
    logUserIn: (_, { token }: { token: string }, { cache }): null => {
      localStorage.setItem("token", token);

      try {
        cache.writeData({
          data: { isLoggedIn: true },
        });
      } catch (error) {
        console.log(error);
      }

      return null;
    },
    logUserOut: (_, __, { cache }): null => {
      localStorage.removeItem("token");
      cache.writeData({
        data: { isLoggedIn: false },
      });

      window.location.replace("/");

      return null;
    },
  },
};
