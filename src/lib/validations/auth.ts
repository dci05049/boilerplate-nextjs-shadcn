import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(1).max(255),
})