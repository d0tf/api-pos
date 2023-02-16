import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import { app } from './config/express';
import { dbConnect } from './utils/db';

dbConnect(app);
