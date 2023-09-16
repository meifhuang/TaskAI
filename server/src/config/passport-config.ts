import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(
    new JWTStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = await User.findById(payload.id)
            if (!user) {
                return done(null, false)
            }
            return done(null, user) 
        }
        catch (err) {
            return done(err, false)
        }
    })
)

export default passport; 

