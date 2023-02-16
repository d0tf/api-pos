import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import moment from 'moment-timezone';
import { router } from '../routes';
import passport from 'passport';
import cors from 'cors';
import { jwtStrategy } from './passport';

const app = express();

passport.use(jwtStrategy);

morgan.token('date', () => {
    return moment(new Date()).tz('Asia/Jakarta').format('DD/MM/YYYY:HH:mm:ss');
});

app.use(morgan('combined'));
app.use(passport.initialize());
app.disable('etag');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

export { app };
