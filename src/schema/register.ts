import { z } from 'zod';

export default z.object({
    name: z.string(),
    username: z.string(),
    password: z.string().min(8),
    roles: z.enum(['admin', 'cashier']).optional(),
});
