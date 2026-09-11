import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contactSchema";
import { saveInquiry } from "@/lib/store/db";
import { ContactApiResponse } from "@/types/contact";

export async function POST(req: NextRequest): Promise<NextResponse<ContactApiResponse>> {
  try {
    const body = await req.json();

    // Validate request body
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please correct the highlighted errors.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    // Save inquiry to persistent datastore
    const savedInquiry = await saveInquiry(validationResult.data);

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been logged successfully. Nickson will review your message shortly.",
        inquiryId: savedInquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API_CONTACT_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}