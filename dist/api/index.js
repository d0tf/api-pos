"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoute = void 0;
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const auth_1 = require("./controller/auth");
const register_1 = require("./controller/register");
const user_1 = require("./controller/user");
const apiRoute = (0, express_1.default)();
exports.apiRoute = apiRoute;
apiRoute.get('/', (req, res) => {
    return res.status(http_status_1.default.OK).send('api here');
});
apiRoute.use('/users', user_1.usersController);
apiRoute.use('/register', register_1.registerController);
apiRoute.use('/auth', auth_1.authController);
//# sourceMappingURL=index.js.map