import bcrypt from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { User } from '../models/user';

export interface GeneratePassword {
    salt: string;
    hash: string;
}

export const genPassword = (password: string): string => {
    const salt: string = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(password, salt);

    return hash;
};

export const validatePassword = (password: string, hash: string): boolean => {
    const isValid: boolean = bcrypt.compareSync(password, hash);

    return isValid;
};

interface IssuJWT {
    token: string;
}

export const issueJWT = (user: User): IssuJWT => {
    const payload: JwtPayload = {
        sub: user.uuid,
        role: user.roles,
        iat: Date.now(),
    };

    const signedToken = sign(payload, process.env.JWT_KEY!, {
        expiresIn: '21d',
        algorithm: 'HS384',
    });

    return {
        token: `Bearer ${signedToken}`,
    };
};

export const verifyJWTUser = async (token: string) => {
    const verifiedToken: string | JwtPayload = verify(
        token,
        process.env.JWT_KEY!,
        { algorithms: ['HS384'] }
    );
    const user = await User.findOne({ uuid: verifiedToken.sub });

    return user;
};
