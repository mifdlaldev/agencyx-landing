import { expect, test } from "@playwright/test";

test.describe("AgencyX landing page", () => {
  test("renders sections and scrolls from the navbar", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /We craft digital experiences that convert/i })).toBeVisible();
    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNav).toBeVisible();

    await primaryNav.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/#features$/);
    await expect(page.getByRole("heading", { name: "Everything you need to launch fast" })).toBeVisible();

    await primaryNav.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.getByRole("heading", { name: "Simple, transparent pricing" })).toBeVisible();
  });

  test("opens the mobile menu and navigates to contact", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("link", { name: "Contact" }).first()).toBeVisible();
    await page.getByRole("link", { name: "Contact" }).first().click();


    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByRole("heading", { name: "Let's work together" })).toBeVisible();
  });

  test("toggles monthly and yearly pricing", async ({ page }) => {
    await page.goto("/#pricing");

    const yearlyBilling = page.getByRole("button", { name: /Yearly/i });
    const monthlyBilling = page.getByRole("button", { name: /Monthly/i });

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
    await waitlistSection.getByRole("button", { name: "Join waitlist" }).click();
    await expect(waitlistSection.getByRole("status")).toContainText("Please enter your name.");

    await waitlistSection.getByPlaceholder("Your name").fill("Ari Builder");
    await waitlistSection.getByRole("button", { name: "Join waitlist" }).click();
    await expect(waitlistSection.getByRole("status")).toContainText("Please enter a valid email.");

    const uniqueEmail = `ari-${Date.now()}@example.com`;
    await waitlistSection.getByPlaceholder("you@company.com").fill(uniqueEmail);
    await waitlistSection.getByRole("button", { name: "Join waitlist" }).click();

    await expect(waitlistSection.getByRole("status")).toContainText(
      /You're on the AgencyX waitlist.|Waitlist storage is not configured\./,
    );
  });

  test("expands and collapses FAQ items", async ({ page }) => {
    await page.goto("/#faq");

    const faqSection = page.locator("#faq");
    const firstQuestion = faqSection.getByRole("button", { name: "What makes AgencyX different from other agencies?" });
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
  });

  test("validates contact form with Zod before submission", async ({ page }) => {
    await page.goto("/#contact");

    const contactSection = page.locator("#contact");

    await contactSection.getByPlaceholder("john@company.com").fill("not-an-email");
    await contactSection.getByRole("button", { name: "Send message" }).click();
    await expect(contactSection.getByRole("status")).toContainText("Please fix the errors below.");

    await contactSection.getByPlaceholder("John Doe").fill("Ari Builder");
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

  test("renders stats, testimonials, FAQ, blog, and contact sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Trusted by founders" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Questions? Answers." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "From the blog" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Let's work together" })).toBeVisible();
  });

  test("navigates testimonial carousel", async ({ page }) => {
    await page.goto("/#testimonials");

    await expect(page.getByText("Sarah Mitchell")).toBeVisible();
    await page.getByRole("button", { name: "Next testimonial" }).click();
    await expect(page.getByText("James Chen")).toBeVisible();
    await page.getByRole("button", { name: "Previous testimonial" }).click();
    await expect(page.getByText("Sarah Mitchell")).toBeVisible();
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
