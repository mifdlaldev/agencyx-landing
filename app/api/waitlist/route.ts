import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validPlans = new Set(["free", "pro", "enterprise"]);

type WaitlistPayload = {
  name: string;
  email: string;
  plan: string;
};

type ValidationResult =
  | { ok: true; data: WaitlistPayload }
  | { ok: false; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function validatePayload(payload: unknown): ValidationResult {
  if (!isRecord(payload)) {
    return { ok: false, message: "Send a valid JSON body." };
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  if (!name) {
    return { ok: false, message: "Enter your name." };
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!emailPattern.test(email)) {
    return { ok: false, message: "Enter a valid work email." };
  }

  const plan = typeof payload.plan === "string" ? payload.plan : "";
  if (!validPlans.has(plan)) {
    return { ok: false, message: "Choose a valid plan." };
  }

  return { ok: true, data: { name, email, plan } };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Send a valid JSON body." }, { status: 400 });
  }

  const result = validatePayload(body);
  if (!result.ok) {
    return Response.json({ message: result.message }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return Response.json({ message: "Waitlist storage is not configured." }, { status: 503 });
  }

  try {
    await prisma.waitlist.create({
      data: result.data,
    });

    return Response.json({ message: "You're on the AgencyX waitlist." }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return Response.json({ message: "This email is already on the waitlist." }, { status: 409 });
    }

    console.error("Waitlist persistence failed", error);
    return Response.json({ message: "Unable to join the waitlist right now." }, { status: 500 });
  }
}
