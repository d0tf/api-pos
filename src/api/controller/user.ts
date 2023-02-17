import Router from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { verifyJWTUser } from '../../utils/helper';

const usersController = Router();

usersController.get(
    '/@me',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = await verifyJWTUser(
            req.headers.authorization?.split(/\s/)[1]!
        );
        return res.status(httpStatus.OK).json(user);
    }
);

export { usersController };
