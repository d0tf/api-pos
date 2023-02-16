"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const routes_1 = require("../routes");
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const passport_2 = require("./passport");
const app = (0, express_1.default)();
exports.app = app;
passport_1.default.use(passport_2.jwtStrategy);
morgan_1.default.token('date', () => {
    return (0, moment_timezone_1.default)(new Date()).tz('Asia/Jakarta').format('DD/MM/YYYY:HH:mm:ss');
});
app.use((0, morgan_1.default)('combined'));
app.use(passport_1.default.initialize());
app.disable('etag');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(routes_1.router);
//# sourceMappingURL=express.js.map