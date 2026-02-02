import * as z from "zod";

const RegisterFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(
    ["customer", "provider"],
    "Role must be either customer or provider",
  ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormType = z.infer<typeof RegisterFormSchema>;

const defaultValues: RegisterFormType = {
  name: "",
  email: "",
  role: "customer",
  password: "",
};

export { defaultValues, RegisterFormSchema, type RegisterFormType };
