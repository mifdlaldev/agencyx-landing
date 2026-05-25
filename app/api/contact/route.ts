import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Enter your name."),
  email: z.string().email("Enter a valid work email."),
  subject: z.string().min(1, "Enter a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Send a valid JSON body." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "Invalid input.";
    return Response.json({ message }, { status: 400 });
  }

  // In a real app, you would send an email or store the contact form submission.
  // For this portfolio demo, we return a success response.
  return Response.json({ message: "Message sent successfully." }, { status: 200 });
}
