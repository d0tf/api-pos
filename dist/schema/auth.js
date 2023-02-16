"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(8),
});
//# sourceMappingURL=auth.js.map