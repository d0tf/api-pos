import Router from 'express';
import status from 'http-status';
import { authController } from './controller/auth';
import { registerController } from './controller/register';
import { usersController } from './controller/user';

const apiRoute = Router();

apiRoute.get('/', (req, res) => {
    return res.status(status.OK).send('api here');
});

apiRoute.use('/users', usersController);

apiRoute.use('/register', registerController);

apiRoute.use('/auth', authController);

export { apiRoute };
