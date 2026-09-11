// src/types/contact.ts
export type ProjectType = 
  | "custom_software" 
  | "web_application" 
  | "mobile_app" 
  | "quant_trading_system" 
  | "api_integration" 
  | "other";

export type BudgetRange = 
  | "under_1k" 
  | "1k_3k" 
  | "3k_5k" 
  | "5k_plus" 
  | "undisclosed";

export type ContactMethod = "email" | "phone" | "whatsapp";

export interface ContactInquiry {
  id: string;
  createdAt: string; // ISO String
  name: string;
  email: string;
  projectType: ProjectType;
  message: string;
  organization?: string;
  budgetRange?: BudgetRange;
  preferredContactMethod?: ContactMethod;
  status: "NEW" | "REVIEWED" | "ARCHIVED";
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
  errors?: Record<string, string>;
}
