import { Router } from 'express';
import httpStatus from 'http-status';
import { apiRoute } from './api';

const router = Router();

router.get('/', (req, res) => {
    return res.status(httpStatus.OK).send('halo');
});

router.use('/api', apiRoute);

router.use((req, res, next) => {
    res.status(httpStatus.NOT_FOUND);
    res.send(`${req.originalUrl} Not Found`);
});

export { router };
