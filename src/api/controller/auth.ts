import authSchema from '../../schema/auth';
import Router from 'express';
import httpStatus from 'http-status';
import { User } from '../../models/user';
import { issueJWT, validatePassword } from '../../utils/helper';

const authController = Router();

authController.post('/', (req, res, next) => {
    authSchema
        .parseAsync(req.body)
        .then((value) => {
            const { username, password } = value;

            return User.findOne({ username })
                .then((user) => {
                    if (!user)
                        return res
                            .status(httpStatus.UNAUTHORIZED)
                            .json({ msg: "Couldn't find user" });

                    const isValid = validatePassword(password, user.password);

                    if (isValid) {
                        const token = issueJWT(user);

                        return res.status(httpStatus.OK).json({ user, token });
                    } else {
                        return res
                            .status(httpStatus.UNAUTHORIZED)
                            .json({ msg: 'Password is incorrect' });
                    }
                })
                .catch((err) => next(err));
        })
        .catch((error) => res.status(httpStatus.BAD_REQUEST).json(error));
});

export { authController };
