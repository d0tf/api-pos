"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const register_1 = __importDefault(require("../../schema/register"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../models/user");
const helper_1 = require("../../utils/helper");
const registerController = (0, express_1.default)();
exports.registerController = registerController;
registerController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    register_1.default
        .parseAsync(req.body)
        .then((value) => {
        const { name, username, password } = value;
        return user_1.User.findOne({ username })
            .then((user) => {
            if (user) {
                return res.status(http_status_1.default.BAD_REQUEST).json({
                    msg: `User with username ${username} already exists!`,
                });
            }
            else {
                return user_1.User.create({ name, username, password: (0, helper_1.genPassword)(password) }, (err, user) => {
                    if (err)
                        return next(err);
                    const token = (0, helper_1.issueJWT)(user);
                    return res
                        .status(http_status_1.default.CREATED)
                        .json({ msg: user, token });
                });
            }
        })
            .catch((err) => next(err));
    })
        .catch((error) => res.status(http_status_1.default.BAD_REQUEST).json(error));
}));
//# sourceMappingURL=register.js.map