import { expect, test } from "@playwright/test";

test.describe("AgencyX landing page", () => {
  test("renders hero sections and scrolls from the navbar", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /We build websites and apps/i })).toBeVisible();
    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNav).toBeVisible();

    await primaryNav.getByRole("link", { name: "Platform" }).click();
    await expect(page).toHaveURL(/#features$/);
    await expect(page.getByRole("heading", { name: /Everything you need to launch and grow/i })).toBeVisible();

    await primaryNav.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.getByRole("heading", { name: /Pricing that scales with your project/i })).toBeVisible();
  });

  test("opens the mobile menu and navigates to contact CTA", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    const header = page.locator("header");
    await expect(header.getByRole("link", { name: "Start a project" })).toBeVisible();
    await header.getByRole("link", { name: "Start a project" }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByRole("heading", { name: /Let’s talk about your next project/i })).toBeVisible();
  });

  test("toggles monthly and yearly pricing", async ({ page }) => {
    await page.goto("/#pricing");

    const yearlyBilling = page.getByRole("button", { name: "Yearly" });
    const monthlyBilling = page.getByRole("button", { name: "Monthly" });

    await expect(yearlyBilling).toBeEnabled();
    await expect(page.getByTestId("price-growth")).toContainText("$1299");
    await yearlyBilling.click();
    await expect(page.getByTestId("price-growth")).toContainText("$12990");
    await monthlyBilling.click();
    await expect(page.getByTestId("price-growth")).toContainText("$1299");
  });

  test("validates waitlist form input and surfaces API storage status", async ({ page }) => {
    await page.goto("/#waitlist");

    const waitlistSection = page.locator("#waitlist");

    await waitlistSection.getByPlaceholder("you@company.com").fill("not-an-email");
    await waitlistSection.getByRole("button", { name: "Get a quote" }).click();
    await expect(waitlistSection.getByRole("status")).toContainText("Please enter your name.");

    await waitlistSection.getByPlaceholder("Your name").fill("Ari Builder");
    await waitlistSection.getByRole("button", { name: "Get a quote" }).click();
    await expect(waitlistSection.getByRole("status")).toContainText("Please enter a valid email.");

    const uniqueEmail = `ari-${Date.now()}@example.com`;
    await waitlistSection.getByPlaceholder("you@company.com").fill(uniqueEmail);
    await waitlistSection.getByRole("button", { name: "Get a quote" }).click();

    await expect(waitlistSection.getByRole("status")).toContainText(
      /You're on the AgencyX waitlist.|Waitlist storage is not configured\./,
    );
  });

  test("expands and collapses FAQ items", async ({ page }) => {
    await page.goto("/#faq");

    const faqSection = page.locator("#faq");
    const firstQuestion = faqSection.getByRole("button", { name: "What services does AgencyX offer?" });
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
  });

  test("validates contact form with Zod before submission", async ({ page }) => {
    await page.goto("/#contact");

    const contactSection = page.locator("#contact");

    await contactSection.getByPlaceholder("you@company.com").fill("not-an-email");
    await contactSection.getByRole("button", { name: "Send message" }).click();
    await expect(contactSection.getByRole("status")).toContainText("Please fix the errors below.");

    await contactSection.getByPlaceholder("Your name").fill("Ari Builder");
    await contactSection.getByRole("button", { name: "Send message" }).click();
    await expect(contactSection.getByText("Valid email is required")).toBeVisible();
  });

  test("waitlist API validates input and handles configured storage", async ({ request }) => {
    const invalidResponse = await request.post("/api/waitlist", {
      data: { name: "", email: "bad", plan: "invalid" },
    });

    expect(invalidResponse.status()).toBe(400);
    await expect(invalidResponse.json()).resolves.toEqual({ message: "Enter your name." });

    const uniqueEmail = `ari-${Date.now()}@example.com`;
    const validResponse = await request.post("/api/waitlist", {
      data: { name: "Ari Builder", email: uniqueEmail, plan: "pro" },
    });

    if (validResponse.status() === 503) {
      await expect(validResponse.json()).resolves.toEqual({ message: "Waitlist storage is not configured." });
      return;
    }

    expect(validResponse.status()).toBe(201);
    await expect(validResponse.json()).resolves.toEqual({ message: "You're on the AgencyX waitlist." });

    const duplicateResponse = await request.post("/api/waitlist", {
      data: { name: "Ari Builder", email: uniqueEmail, plan: "pro" },
    });

    expect(duplicateResponse.status()).toBe(409);
    await expect(duplicateResponse.json()).resolves.toEqual({ message: "This email is already on the waitlist." });
  });

  test("renders proof, testimonials, FAQ, blog, and contact sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#stats").getByText("Trusted by teams who ship fast")).toBeVisible();
    await expect(page.getByRole("heading", { name: /What our clients say/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Questions before the next build/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Notes from the studio/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Let’s talk about your next project/i })).toBeVisible();
  });

  test("navigates testimonial carousel", async ({ page }) => {
    await page.goto("/#testimonials");

    const testimonialSection = page.locator("#testimonials");
    await expect(testimonialSection.getByRole("blockquote").getByText("Sarah Mitchell")).toBeVisible();
    await testimonialSection.getByRole("button", { name: "Next testimonial" }).click();
    await expect(testimonialSection.getByRole("blockquote").getByText("James Chen")).toBeVisible();
    await testimonialSection.getByRole("button", { name: "Previous testimonial" }).click();
    await expect(testimonialSection.getByRole("blockquote").getByText("Sarah Mitchell")).toBeVisible();
  });

  test("contact API validates input with Zod", async ({ request }) => {
    const invalidResponse = await request.post("/api/contact", {
      data: { name: "", email: "bad", subject: "", message: "hi" },
    });

    expect(invalidResponse.status()).toBe(400);
    await expect(invalidResponse.json()).resolves.toEqual({ message: "Enter your name." });

    const validResponse = await request.post("/api/contact", {
      data: {
        name: "Ari Builder",
        email: "ari@example.com",
        subject: "Hello",
        message: "This is a test message with enough length.",
      },
    });

    expect(validResponse.status()).toBe(200);
    await expect(validResponse.json()).resolves.toEqual({ message: "Message sent successfully." });
  });
});
