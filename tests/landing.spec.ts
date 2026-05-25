import { expect, test } from "@playwright/test";

test.describe("AgencyX landing page", () => {
  test("renders sections and scrolls from the navbar", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Launch campaigns before the market moves/i })).toBeVisible();
    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNav).toBeVisible();

    await primaryNav.getByRole("link", { name: "Features" }).click();
    await expect(page).toHaveURL(/#features$/);
    await expect(page.getByRole("heading", { name: "What ships with AgencyX" })).toBeVisible();

    await primaryNav.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.getByRole("heading", { name: "Simple pricing for sharp launches" })).toBeVisible();
  });

  test("opens the mobile menu and navigates to waitlist", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("link", { name: "Join waitlist" })).toBeVisible();
    await page.getByRole("link", { name: "Join waitlist" }).click();
    await expect(page).toHaveURL(/#waitlist$/);
    await expect(page.getByRole("heading", { name: "Reserve your launch slot" })).toBeVisible();
  });

  test("toggles monthly and yearly pricing", async ({ page }) => {
    await page.goto("/#pricing");

    const yearlyBilling = page.getByRole("button", { name: "Yearly billing" });
    const monthlyBilling = page.getByRole("button", { name: "Monthly billing" });

    await expect(yearlyBilling).toBeEnabled();
    await expect(page.getByTestId("price-pro")).toContainText("$29");
    await yearlyBilling.click();
    await expect(page.getByTestId("price-pro")).toContainText("$290");
    await monthlyBilling.click();
    await expect(page.getByTestId("price-pro")).toContainText("$29");
  });

  test("persists the selected color theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("agencyx-theme"));
    await page.reload();

    const darkThemeButton = page.getByRole("button", { name: "Switch to dark theme" }).first();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(darkThemeButton).toBeEnabled();
    await darkThemeButton.click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("validates waitlist form input and surfaces API storage status", async ({ page }) => {
    await page.goto("/#waitlist");

    const waitlistSection = page.locator("#waitlist");

    await waitlistSection.getByLabel("Work email").fill("not-an-email");
    await waitlistSection.getByRole("button", { name: "Request early access" }).click();
    await expect(waitlistSection.getByRole("status")).toContainText("Enter your name.");

    await waitlistSection.getByLabel("Full name").fill("Ari Builder");
    await waitlistSection.getByRole("button", { name: "Request early access" }).click();
    await expect(waitlistSection.getByRole("status")).toContainText("Enter a valid work email.");

    const uniqueEmail = `ari-${Date.now()}@example.com`;
    await waitlistSection.getByLabel("Work email").fill(uniqueEmail);
    await waitlistSection.getByRole("button", { name: "Request early access" }).click();

    await expect(waitlistSection.getByRole("status")).toContainText(
      /You're on the AgencyX waitlist.|Waitlist storage is not configured\./,
    );
    const statusText = await waitlistSection.getByRole("status").textContent();

    if (statusText?.includes("You're on the AgencyX waitlist.")) {
      await expect(waitlistSection.getByLabel("Full name")).toHaveValue("");
      await expect(waitlistSection.getByLabel("Work email")).toHaveValue("");
    }
  });

  test("expands and collapses FAQ items", async ({ page }) => {
    await page.goto("/#faq");

    const faqSection = page.locator("#faq");
    const firstQuestion = faqSection.getByRole("button", { name: "What is AgencyX?" });
    await firstQuestion.click();
    await expect(faqSection.getByText("built as a portfolio demonstration.")).toBeVisible();

    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
  });

  test("validates contact form with Zod before submission", async ({ page }) => {
    await page.goto("/#contact");

    const contactSection = page.locator("#contact");

    await contactSection.getByLabel("Work email").fill("not-an-email");
    await contactSection.getByRole("button", { name: "Send message" }).click();
    await expect(contactSection.getByRole("status")).toContainText("Please fix the errors above.");

    await contactSection.getByLabel("Full name").fill("Ari Builder");
    await contactSection.getByRole("button", { name: "Send message" }).click();
    await expect(contactSection.getByText("Enter a valid work email.")).toBeVisible();
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

    await expect(page.getByRole("heading", { name: "Built for speed, trusted by teams" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What teams say about AgencyX" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Questions that come up often" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Notes from the launch floor" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Get in touch" })).toBeVisible();
  });

  test("navigates testimonial carousel", async ({ page }) => {
    await page.goto("/#testimonials");

    await expect(page.getByText("Rina Santoso")).toBeVisible();
    await page.getByRole("button", { name: "Next testimonial" }).click();
    await expect(page.getByText("Dani Wijaya")).toBeVisible();
    await page.getByRole("button", { name: "Previous testimonial" }).click();
    await expect(page.getByText("Rina Santoso")).toBeVisible();
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
