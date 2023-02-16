import registerSchema from '../../schema/register';
import Router from 'express';
import httpStatus from 'http-status';
import { User } from '../../models/user';
import { issueJWT, genPassword } from '../../utils/helper';

const registerController = Router();

registerController.post('/', async (req, res, next) => {
    registerSchema
        .parseAsync(req.body)
        .then((value) => {
            const { name, username, password } = value;

            return User.findOne({ username })
                .then((user) => {
                    if (user) {
                        return res.status(httpStatus.BAD_REQUEST).json({
                            msg: `User with username ${username} already exists!`,
                        });
                    } else {
                        return User.create(
                            { name, username, password: genPassword(password) },
                            (err, user) => {
                                if (err) return next(err);
                                const token = issueJWT(user);

                                return res
                                    .status(httpStatus.CREATED)
                                    .json({ msg: user, token });
                            }
                        );
                    }
                })
                .catch((err) => next(err));
        })
        .catch((error) => res.status(httpStatus.BAD_REQUEST).json(error));
});

export { registerController };
