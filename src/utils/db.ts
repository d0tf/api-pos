import mongoose from 'mongoose';
import { Express } from 'express';

const port: number = Number(process.env.PORT) || 3001;

export const dbConnect = async (app: Express) => {
    mongoose.set('strictQuery', false);
    mongoose
        .connect(process.env.MONGODB_URI!, { dbName: process.env.DB_NAME })
        .then(() => {
            app.listen(port, () => {
                console.log(`Server is start on port: ${port}`);
            });
        })
        .catch((e) => console.error(e.message));
};
