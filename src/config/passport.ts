// src/passport/jwtStrategy.ts
import passport from 'passport';
import { Strategy as JwtStrategy,StrategyOptions } from 'passport-jwt';
import { Request } from 'express';


const SECRET_KEY = 'secret';

// Custom function to extract the JWT from a cookie named 'jwt'
function cookieExtractor(req: Request): string | null {
  if (req && req.cookies) {
    return req.cookies['jwt'] || null;
  }
  return null;
}

// Configure Passport to use the JWT strategy
const options: StrategyOptions = {
  // We use a custom extractor to read the JWT from the cookie
  jwtFromRequest: cookieExtractor,
  secretOrKey: SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      
      if (payload) {
     
        const user = { email: payload.email, username: payload.username };
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);


export default passport;