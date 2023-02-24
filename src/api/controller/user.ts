import Router from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { verifyJWTUser } from '../../utils/helper';
import verifyAdmin from '../../middleware/verifyAdmin';
import { getUser } from '../../services/user';

const usersController = Router();

usersController.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    async (req, res) => {
        const users = await getUser();
        return res.status(users.status).json(users.result);
    }
);

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

usersController.get(
    '/:uuid',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    async (req, res) => {
        const { uuid } = req.params;
        const user = await getUser({ uuid });

        return res.status(user.status).json(user.result);
    }
);

export { usersController };
