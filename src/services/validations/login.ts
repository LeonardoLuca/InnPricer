import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
  rememberMe: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;