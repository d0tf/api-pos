import { NextFunction, Request, Response } from 'express';
import { verifyJWTUser } from '../utils/helper';
import httpStatus from 'http-status';

export default async (req: Request, res: Response, next: NextFunction) => {
    const user = await verifyJWTUser(
        req.headers.authorization?.split(/\s/)[1]!
    );

    if (user?.roles === 'admin') return next();

    return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "You don't have permission!" });
};
