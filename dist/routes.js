"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const api_1 = require("./api");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    return res.status(http_status_1.default.OK).send('halo');
});
router.use('/api', api_1.apiRoute);
router.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND);
    res.send(`${req.originalUrl} Not Found`);
});
//# sourceMappingURL=routes.js.map