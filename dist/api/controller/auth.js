"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_1 = __importDefault(require("../../schema/auth"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../models/user");
const helper_1 = require("../../utils/helper");
const authController = (0, express_1.default)();
exports.authController = authController;
authController.post('/', (req, res, next) => {
    auth_1.default
        .parseAsync(req.body)
        .then((value) => {
        const { username, password } = value;
        return user_1.User.findOne({ username })
            .then((user) => {
            if (!user)
                return res
                    .status(http_status_1.default.UNAUTHORIZED)
                    .json({ msg: "Couldn't find user" });
            const isValid = (0, helper_1.validatePassword)(password, user.password);
            if (isValid) {
                const token = (0, helper_1.issueJWT)(user);
                return res.status(http_status_1.default.OK).json({ user, token });
            }
            else {
                return res
                    .status(http_status_1.default.UNAUTHORIZED)
                    .json({ msg: 'Password is incorrect' });
            }
        })
            .catch((err) => next(err));
    })
        .catch((error) => res.status(http_status_1.default.BAD_REQUEST).json(error));
});
//# sourceMappingURL=auth.js.map