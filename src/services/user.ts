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

const createUser = ({
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

const getUser = (uuid?: {
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

const deleteUser = ({
    uuid,
}: {
    uuid: string;
}): Promise<{ status: number; result: User[] }> => {
    return new Promise((resolve) => {
        User.findOneAndDelete({ uuid })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    });
};

export { createUser, getUser, deleteUser };
