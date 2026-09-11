// src/lib/store/db.ts
import { ContactInquiry } from "@/types/contact";

// Global singleton array simulating persistent DB storage (Prisma / PostgreSQL ready)
const globalForInquiries = globalThis as unknown as {
  inquiries: ContactInquiry[];
};

export const inquiriesStore: ContactInquiry[] = globalForInquiries.inquiries || [];

if (process.env.NODE_ENV !== "production") {
  globalForInquiries.inquiries = inquiriesStore;
}

export async function saveInquiry(data: Omit<ContactInquiry, "id" | "createdAt" | "status">): Promise<ContactInquiry> {
  const newInquiry: ContactInquiry = {
    ...data,
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "NEW",
  };

  inquiriesStore.unshift(newInquiry);

  // Hook for future email notification dispatcher (Resend / SendGrid)
  await triggerEmailNotification(newInquiry);

  return newInquiry;
}

export async function getAllInquiries(): Promise<ContactInquiry[]> {
  return inquiriesStore;
}

// Configurable placeholder for future mail dispatching service
async function triggerEmailNotification(inquiry: ContactInquiry): Promise<void> {
  const emailServiceEnabled = process.env.ENABLE_EMAIL_NOTIFICATIONS === "true";

  if (!emailServiceEnabled) {
    // Log intent without inventing false delivery addresses
    console.log(`[MAIL_SERVICE // DISABLED] Inquiry ${inquiry.id} stored in database.`);
    return;
  }

  // Future production integration point: Resend / SendGrid / AWS SES API Call
  console.log(`[MAIL_SERVICE // DISPATCHING] Sending notification for inquiry ${inquiry.id}`);
}
