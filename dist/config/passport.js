"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../models/user");
const jwtOpts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
    algorithms: ['HS384'],
};
exports.jwtStrategy = new passport_jwt_1.Strategy(jwtOpts, (payload, done) => {
    user_1.User.findOne({ uuid: payload.sub })
        .then((user) => {
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
        .catch((err) => done(err, false));
});
//# sourceMappingURL=passport.js.map