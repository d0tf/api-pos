import registerSchema from '../../schema/register';
import Router from 'express';
import httpStatus from 'http-status';
import { createUser } from '../../services/user';

const registerController = Router();

registerController.post('/', async (req, res, next) => {
    registerSchema
        .parseAsync(req.body)
        .then(async (value) => {
            const created = await createUser(value);

            return res.status(created.status).json(created.result);
        })
        .catch((error) => res.status(httpStatus.BAD_REQUEST).json(error));
});

export { registerController };
