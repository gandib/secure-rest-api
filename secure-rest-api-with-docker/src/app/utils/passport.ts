import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '../config';
import { User } from '../modules/Auth/auth.model';

const JWT_SECRET = config.jwt_access_secret;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload?.userId);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }),
);
