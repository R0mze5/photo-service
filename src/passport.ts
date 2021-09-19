import passport from 'passport';

import JwtStrategy from 'passport-jwt';

import './utils';
import { prisma } from '../generated/prisma-client';
import { User } from '../typings/User';

const jwtOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || '',
};

const verifyUser = async (payload:any, done:any) => {
  try {
    const user = await prisma.user({ id: payload.id });

    if (user !== null) {
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJWT = (req:any, res:any, next:any) => passport.authenticate('jwt', { session: false }, (error, user?:User | null) => {
  if (user) {
    req.user = user;
  }
  next();
})(req, res, next);

passport.use(new JwtStrategy.Strategy(jwtOptions, verifyUser));
passport.initialize();
