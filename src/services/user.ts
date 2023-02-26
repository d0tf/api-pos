import httpStatus from 'http-status';
import { User } from '../models/user';
import { IssueJWT, genPassword, issueJWT } from '../utils/helper';
import _ from 'lodash';

interface UserParameter {
    name: string;
    username: string;
    password: string;
    roles?: 'admin' | 'cashier';
}

export const createUser = ({
    name,
    username,
    password,
    roles,
}: UserParameter): Promise<{
    status: number;
    result: { msg: string } | { user: User; token: IssueJWT };
}> => {
    return new Promise((resolve) => {
        User.findOne({ username }).then((user) => {
            if (user) {
                return resolve({
                    status: httpStatus.BAD_REQUEST,
                    result: {
                        msg: `User with username ${username} already exists!`,
                    },
                });
            } else {
                User.create(
                    { name, username, password: genPassword(password), roles },
                    (err, user) => {
                        if (err) throw err;

                        const token = issueJWT(user);

                        return resolve({
                            status: httpStatus.CREATED,
                            result: { user, token },
                        });
                    }
                );
            }
        });
    });
};

export const getUser = (uuid?: {
    uuid: string;
}): Promise<{
    status: number;
    result: { msg: string } | User[];
}> => {
    return new Promise((resolve) => {
        User.find({ ...uuid })
            .then((user) => {
                if (_.isEmpty(user))
                    return resolve({
                        status: httpStatus.NOT_FOUND,
                        result: { msg: "Couldn't find user" },
                    });
                return resolve({ status: httpStatus.OK, result: user });
            })
            .catch((err) => {
                throw err;
            });
    });
};

export const deleteUser = ({
    uuid,
}: {
    uuid: string;
}): Promise<{ status: number; result?: { msg: string } }> => {
    return new Promise((resolve) => {
        User.findOneAndDelete({ uuid })
            .then((res) => {
                if (!res)
                    return resolve({
                        status: httpStatus.BAD_REQUEST,
                        result: { msg: "Couldn't find user" },
                    });

                return resolve({ status: httpStatus.NO_CONTENT });
            })
            .catch((err) => {
                throw err;
            });
    });
};

export const updateUser = ({
    uuid,
    name,
    username,
    password,
    roles,
}: {
    uuid: string;
    name?: string;
    username?: string;
    password?: string;
    roles?: 'admin' | 'cashier';
}): Promise<{ status: number; result: User | { msg: string } }> => {
    return new Promise((resolve) => {
        User.findOneAndUpdate(
            { uuid },
            {
                name,
                username,
                password: password && genPassword(password),
                roles,
            },
            { new: true }
        )
            .then((user) => {
                if (!user) return;
                return resolve({ status: httpStatus.OK, result: user });
            })
            .catch((err) => {
                throw err;
            });
    });
};
