import Router from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { verifyJWTUser } from '../../utils/helper';
import verifyAdmin from '../../middleware/verifyAdmin';
import { deleteUser, getUser, updateUser } from '../../services/user';
import updateProfile from '../../schema/updateProfile';

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

// TODO return bad request when request body contains update for roles
usersController.put(
    '/@me',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = await verifyJWTUser(
            req.headers.authorization?.split(/\s/)[1]!
        );

        updateProfile
            .parseAsync(req.body)
            .then(async (value) => {
                const { name, username, password } = value;
                const updated = await updateUser({
                    uuid: user.uuid,
                    name,
                    username,
                    password,
                });

                return res.status(updated.status).json(updated.result);
            })
            .catch((error) => console.error(error));
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

usersController.delete(
    '/:uuid',
    passport.authenticate('jwt', { session: false }),
    verifyAdmin,
    async (req, res) => {
        const { uuid } = req.params;
        const response = await deleteUser({ uuid });

        res.status(response.status).json(response.result);
    }
);

export { usersController };
