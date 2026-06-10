import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(3, "Password minimal 3 karakter"),
});

export type ILoginFormValues = z.infer<typeof loginSchema>;
