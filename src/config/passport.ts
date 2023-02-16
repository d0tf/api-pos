import { JwtPayload } from 'jsonwebtoken';
import {
    Strategy,
    ExtractJwt,
    StrategyOptions,
    VerifiedCallback,
} from 'passport-jwt';
import { User } from '../models/user';

const jwtOpts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
    algorithms: ['HS384'],
};

export const jwtStrategy: Strategy = new Strategy(
    jwtOpts,
    (payload: JwtPayload, done: VerifiedCallback) => {
        User.findOne({ uuid: payload.sub })
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err: Error) => done(err, false));
    }
);
