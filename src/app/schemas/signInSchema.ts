
import { z } from "zod";

export const sighINSchema = z.object({
    identifier: z.string(),
    password:z.string(),
    // email: z.string().email(),
})
