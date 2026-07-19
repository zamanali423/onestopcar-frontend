import { z } from "zod";

export const addToCartSchema = z.object({
  style: z.enum(["4 Sides", "Back", "(4 Sides+Back) Full Set"]),
  quantity: z.number().int().min(1).max(99),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// contact form
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Validation Schema Checkout ───────────────────────────────

const phoneRegex = /^(\+92|0)[0-9]{10}$|^(\+92|0)[-\s]?[0-9]{3}[-\s]?[0-9]{7}$/;

export const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
    lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
    phone: z
        .string()
        .min(10, "Please enter a valid phone number")
        .regex(phoneRegex, "Enter a valid Pakistani number (e.g. 03001234567)"),
    altPhone: z
        .string()
        .optional()
        .refine((v) => !v || v === "" || phoneRegex.test(v), "Enter a valid Pakistani number"),
    email: z
        .string()
        .optional()
        .refine((v) => !v || v === "" || z.string().email().safeParse(v).success, "Enter a valid email"),
    country: z.string().optional(),
    province: z.string().min(1, "Please select a province"),
    city: z.string().min(1, "Please select a city"),
    area: z.string().optional(),
    address: z
        .string()
        .min(10, "Please provide a complete address (at least 10 characters)")
        .max(300),
    postalCode: z.string().optional(),
    landmark: z.string().optional(),
    orderNotes: z.string().optional(),
});

// Derive form data type from schema
export type FormValues = z.infer<typeof checkoutSchema>;


// ................ Authentication .......................
// src/lib/validations/auth.ts

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;