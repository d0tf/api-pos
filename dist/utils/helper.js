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
exports.verifyJWTUser = exports.issueJWT = exports.validatePassword = exports.genPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = require("../models/user");
const genPassword = (password) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
};
exports.genPassword = genPassword;
const validatePassword = (password, hash) => {
    const isValid = bcrypt_1.default.compareSync(password, hash);
    return isValid;
};
exports.validatePassword = validatePassword;
const issueJWT = (user) => {
    const payload = {
        sub: user.uuid,
        role: user.roles,
        iat: Date.now(),
    };
    const signedToken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_KEY, {
        expiresIn: '21d',
        algorithm: 'HS384',
    });
    return {
        token: `Bearer ${signedToken}`,
    };
};
exports.issueJWT = issueJWT;
const verifyJWTUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY, { algorithms: ['HS384'] });
    const user = yield user_1.User.findOne({ uuid: verifiedToken.sub });
    return user;
});
exports.verifyJWTUser = verifyJWTUser;
//# sourceMappingURL=helper.js.map