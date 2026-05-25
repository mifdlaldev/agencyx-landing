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

    await page.getByLabel("Work email").fill("not-an-email");
    await page.getByRole("button", { name: "Request early access" }).click();
    await expect(page.getByRole("status")).toContainText("Enter your name.");

    await page.getByLabel("Full name").fill("Ari Builder");
    await page.getByRole("button", { name: "Request early access" }).click();
    await expect(page.getByRole("status")).toContainText("Enter a valid work email.");

    const uniqueEmail = `ari-${Date.now()}@example.com`;
    await page.getByLabel("Work email").fill(uniqueEmail);
    await page.getByRole("button", { name: "Request early access" }).click();

    await expect(page.getByRole("status")).toContainText(
      /You're on the AgencyX waitlist.|Waitlist storage is not configured\./,
    );
    const statusText = await page.getByRole("status").textContent();

    if (statusText?.includes("You're on the AgencyX waitlist.")) {
      await expect(page.getByLabel("Full name")).toHaveValue("");
      await expect(page.getByLabel("Work email")).toHaveValue("");
    }
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
});
