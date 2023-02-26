import { z } from 'zod';

export default z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    password: z.string().min(8).optional(),
});
