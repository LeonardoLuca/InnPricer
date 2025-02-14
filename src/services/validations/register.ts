import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[0-9]/, "A senha deve conter pelo menos 1 número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos 1 caractere especial"),
  confirmPassword: z.string(),
  first_name: z.string().min(1, "Nome é obrigatório"),
  last_name: z.string().min(1, "Sobrenome é obrigatório"),
  hotel: z.object({
    name: z.string().min(1, "Nome do hotel é obrigatório"),
    location: z.number({
      required_error: "Localização é obrigatória",
      invalid_type_error: "Localização inválida",
    }),
    stars: z.number().min(1).max(5),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;