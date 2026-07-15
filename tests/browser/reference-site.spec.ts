import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const authoredForms = [
  "ground",
  "kicker",
  "rule",
  "index-row",
  "plate",
  "action-link",
  "figure-caption",
] as const;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("renders one coherent, source-grounded specimen", async ({ page }) => {
  await expect(page).toHaveTitle("Joyful Brutalist Minimalism");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "JoyfulBrutalistMinimalism",
  );
  await expect(page.locator("[data-principle]")).toHaveCount(8);
  await expect(page.locator(".authority-node")).toHaveCount(4);
  const lensRows = page.locator(".lens-ledger > div");
  await expect(lensRows.nth(0)).toContainText(/Structure\s*2 \/ 8/);
  await expect(lensRows.nth(1)).toContainText(/Experience\s*2 \/ 8/);
  await expect(lensRows.nth(2)).toContainText(/Translation\s*3 \/ 8/);
  await expect(lensRows.nth(3)).toContainText(/Access\s*1 \/ 8/);

  for (const form of authoredForms) {
    await expect(page.locator(`[data-jbm-form="${form}"]`).first()).toBeAttached();
  }
});

test("reading instrument follows the real principle ledger", async ({ page }) => {
  const fifthMark = page.locator("[data-instrument-mark]").nth(4);
  await fifthMark.click();

  await expect(fifthMark).toHaveAttribute("aria-current", "location");
  await expect(page.locator("#reading-progress")).toHaveJSProperty("value", 5);
  await expect(page.locator("[data-instrument-status]")).toHaveText(
    "Principle 5 of 8 · Experience",
  );
  await expect(page).toHaveURL(/#principle-05$/);
});

test("keyboard entry exposes a strong focus indicator", async ({ page }) => {
  const skipLink = page.getByRole("link", { name: "Skip to the language" });
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();

  const outline = await skipLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return { style: style.outlineStyle, width: style.outlineWidth };
  });
  expect(outline.style).not.toBe("none");
  expect(outline.width).not.toBe("0px");

  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("the complete page remains useful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.locator("[data-principle]")).toHaveCount(8);
  await expect(page.locator("[data-instrument-mark]")).toHaveCount(8);
  await expect(page.getByRole("figure")).toBeVisible();
  await expect(page.getByRole("link", { name: /Canonical tokens/ })).toBeVisible();

  const finalMark = page.locator("[data-instrument-mark]").last();
  await finalMark.click();
  await expect(page).toHaveURL(/#principle-08$/);
  await expect(page.locator("#principle-08")).toBeInViewport();

  await context.close();
});

test("reduced motion preserves state while removing movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.evaluate(() => document.fonts.ready);

  const mark = page.locator("[data-instrument-mark]").first();
  const motion = await mark.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      duration: style.transitionDuration,
      transform: style.transform,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });

  expect(motion.duration).toBe("0s");
  expect(motion.transform).toBe("none");
  expect(motion.scrollBehavior).toBe("auto");
  await expect(page.locator("[data-principle]")).toHaveCount(8);
});

test("has no automatically detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("matches representative desktop and mobile surfaces", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("reference-site-desktop.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0.03,
  });

  await expect(page.locator(".technical-figure")).toHaveScreenshot(
    "reference-site-figure.png",
    {
      animations: "disabled",
      maxDiffPixelRatio: 0.03,
    },
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("reference-site-mobile.png", {
    animations: "disabled",
    // Source Serif rasterizes differently on macOS and Linux at this density.
    // Layout, interaction, and content assertions remain exact above.
    maxDiffPixelRatio: 0.15,
  });
});
