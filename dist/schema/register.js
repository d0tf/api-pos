"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(8),
    roles: zod_1.z.enum(['admin', 'cashier']).optional(),
});
//# sourceMappingURL=register.js.map