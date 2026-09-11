// src/lib/validations/contactSchema.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  projectType: z.enum([
    "custom_software",
    "web_application",
    "mobile_app",
    "quant_trading_system",
    "api_integration",
    "other"
  ], { required_error: "Please select a project type." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
  organization: z.string().optional(),
  budgetRange: z.enum(["under_1k", "1k_3k", "3k_5k", "5k_plus", "undisclosed"]).optional(),
  preferredContactMethod: z.enum(["email", "phone", "whatsapp"]).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
