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
  await expect(
    page.getByRole("heading", { name: "One change. Four clear checks." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Round-trip sync/ })).toBeVisible();
  await expect(page.locator("[data-instrument-mark]")).toHaveCount(8);
  await expect(page.locator(".mark-code")).toHaveCount(0);
  await expect(page.locator(".lens-ledger")).toHaveCount(0);
  await expect(page.locator(".index-lens")).toHaveCount(0);
  await expect(page.locator(".space-plate")).toHaveCount(0);

  for (const form of authoredForms) {
    await expect(page.locator(`[data-jbm-form="${form}"]`).first()).toBeAttached();
  }
});

test("defaults to Terra and previews one whole-site colorway at a time", async ({
  page,
}) => {
  const root = page.locator("html");
  const preview = page.locator("[data-colorway-preview]");
  const accentDefault = page.locator(".swatch-accent-default .swatch-chip");
  const accentField = page.locator(".swatch-accent-field .swatch-chip");

  await expect(root).toHaveAttribute("data-jbm-colorway", "terra");
  await expect(preview).toBeVisible();
  await expect(
    page.getByRole("button", { name: "terra" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(accentDefault).toHaveCSS("background-color", "rgb(169, 66, 41)");

  await page.getByRole("button", { name: "sage" }).click();
  await expect(root).toHaveAttribute("data-jbm-colorway", "sage");
  await expect(accentDefault).toHaveCSS("background-color", "rgb(95, 112, 87)");
  await expect(accentField).toHaveCSS("background-color", "rgb(223, 229, 219)");
  await expect(page.locator(".colorway-status")).toHaveText(
    "Sage colorway active",
  );

  await page.getByRole("button", { name: "sky" }).click();
  await expect(root).toHaveAttribute("data-jbm-colorway", "sky");
  await expect(accentDefault).toHaveCSS("background-color", "rgb(46, 102, 112)");
  await expect(accentField).toHaveCSS("background-color", "rgb(167, 216, 222)");
  await expect(
    page.locator('[data-colorway-option][aria-pressed="true"]'),
  ).toHaveCount(1);

  await root.evaluate((element) => {
    (element as HTMLElement).dataset.jbmColorway = "unknown";
  });
  await expect(accentDefault).toHaveCSS("background-color", "rgb(169, 66, 41)");
});

test("colorway choices render as three equal color cards", async ({ page }) => {
  const cards = page.locator("[data-colorway-option]");
  await expect(cards).toHaveCount(3);

  const geometry = await cards.evaluateAll((elements) =>
    elements.map((element) => {
      const bounds = element.getBoundingClientRect();
      const field = element.querySelector(".colorway-card-field")?.getBoundingClientRect();
      return {
        width: Math.round(bounds.width),
        fieldHeight: Math.round(field?.height ?? 0),
      };
    }),
  );

  expect(new Set(geometry.map(({ width }) => width)).size).toBe(1);
  expect(geometry.every(({ fieldHeight }) => fieldHeight >= 112)).toBe(true);
});

test("section introductions share one clear hierarchy", async ({ page }) => {
  const alignment = await page.evaluate(() =>
    ["principles", "foundations", "marginalia", "figure"].map((id) => {
      const section = document.querySelector(`#${id}`);
      const label = section?.querySelector(".kicker")?.getBoundingClientRect();
      const copy = section
        ?.querySelector(".section-intro > p:last-child")
        ?.getBoundingClientRect();
      const title = section?.querySelector("h2")?.getBoundingClientRect();
      return {
        id,
        labelTop: Math.round(label?.top ?? -1),
        copyTop: Math.round(copy?.top ?? -2),
        titleTop: Math.round(title?.top ?? -3),
      };
    }),
  );

  for (const section of alignment) {
    expect(section.copyTop, section.id).toBe(section.labelTop);
    expect(section.titleTop, section.id).toBeGreaterThan(section.labelTop);
  }
});

test("principle index links directly to the real ledger", async ({ page }) => {
  const fifthMark = page.locator("[data-instrument-mark]").nth(4);
  await fifthMark.click();

  await expect(page).toHaveURL(/#principle-05$/);
  await expect(page.locator("#principle-05")).toBeInViewport();
  await expect(page.locator("#reading-progress")).toHaveCount(0);
  await expect(page.locator("[data-instrument-status]")).toHaveCount(0);
});

test("annotated desktop hierarchy is restrained and contained", async ({ page }) => {
  await page.setViewportSize({ width: 1247, height: 784 });
  await page.evaluate(() => document.fonts.ready);

  await expect(page.locator(".hero-lede")).toHaveCSS("font-size", "20.4px");
  await expect(page.locator(".hero-thesis p:not(.hero-lede)")).toHaveCSS(
    "font-size",
    "13px",
  );
  await expect(page.locator("#reading-progress")).toHaveCount(0);

  const layout = await page.evaluate(() => {
    const rail = document.querySelector<HTMLElement>(".reading-instrument");
    const ledger = document.querySelector<HTMLElement>(".translation-ledger");
    return {
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      railClientWidth: rail?.clientWidth ?? 0,
      railScrollWidth: rail?.scrollWidth ?? 0,
      railScrollbarColor: rail ? getComputedStyle(rail).scrollbarColor : "auto",
      ledgerClientWidth: ledger?.clientWidth ?? 0,
      ledgerScrollWidth: ledger?.scrollWidth ?? 0,
    };
  });

  expect(layout.documentScrollWidth).toBe(layout.documentClientWidth);
  expect(layout.railScrollWidth).toBe(layout.railClientWidth);
  expect(layout.ledgerScrollWidth).toBe(layout.ledgerClientWidth);
  expect(layout.railScrollbarColor).not.toBe("auto");
});

test("tablet, mobile, and 200 percent zoom equivalents do not overflow", async ({ page }) => {
  for (const viewport of [
    { width: 900, height: 900 },
    { width: 720, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const width = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));

    expect(width.scroll).toBe(width.client);
    await expect(page.getByRole("link", { name: /Read the constitution/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open the Figma source/ })).toBeVisible();
  }
});

test("long translation copy stays inside its ruled ledger", async ({ page }) => {
  await page.setViewportSize({ width: 1247, height: 784 });
  await page.goto("/#translation");

  const secondEntry = page.locator(".translation-ledger article").nth(1);
  await secondEntry.locator("h3").evaluate((heading) => {
    heading.textContent =
      "Responsive composition with a deliberatelyunbrokenevidencelabelthatmuststillwrap";
  });
  await secondEntry.locator("p").evaluate((paragraph) => {
    paragraph.textContent =
      "A longer explanation remains bounded by the same authored rule and never widens the document.";
  });

  const layout = await page.evaluate(() => {
    const ledger = document.querySelector<HTMLElement>(".translation-ledger");
    const entry = ledger?.children[1] as HTMLElement | undefined;
    const ledgerBounds = ledger?.getBoundingClientRect();
    const entryBounds = entry?.getBoundingClientRect();
    return {
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      ledgerRight: ledgerBounds?.right ?? 0,
      entryRight: entryBounds?.right ?? Number.POSITIVE_INFINITY,
    };
  });

  expect(layout.documentScrollWidth).toBe(layout.documentClientWidth);
  expect(layout.entryRight).toBeLessThanOrEqual(layout.ledgerRight);
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

test("pointer entry exposes the authored action state", async ({ page }) => {
  const action = page.getByRole("link", { name: /Read the constitution/ });
  const before = await action.evaluate((element) => {
    const style = getComputedStyle(element);
    return { color: style.color, paddingInline: style.paddingInline };
  });

  await action.hover();

  await expect
    .poll(() =>
      action.evaluate((element) => getComputedStyle(element).color),
    )
    .not.toBe(before.color);
  await expect
    .poll(() =>
      action.evaluate((element) => getComputedStyle(element).paddingInline),
    )
    .not.toBe(before.paddingInline);
});

test("contextual marginalia exchanges its register for the matching note", async ({
  page,
}) => {
  const study = page.locator('[data-jbm-study="contextual-marginalia"]');
  const register = study.locator(".marginalia-register");
  const firstTrigger = study.locator('[data-note-trigger="01"]');
  const secondTrigger = study.locator('[data-note-trigger="02"]');
  const firstNote = study.locator('[data-note="01"]');
  const secondNote = study.locator('[data-note="02"]');

  await expect(study).toBeAttached();
  await expect(study.locator(".marginalia-register li")).toHaveCount(2);
  await expect(study.locator(".marginal-note")).toHaveCount(2);
  await expect(study.locator(".marginalia-passage")).toHaveCSS(
    "font-size",
    "16px",
  );
  await expect(register).toHaveCSS("opacity", "1");
  await expect(firstNote).toHaveCSS("opacity", "0");
  const boundaries = await Promise.all(
    [firstTrigger, secondTrigger].map((trigger) =>
      trigger.evaluate((element) => ({
        before: element.previousSibling?.textContent?.slice(-1),
        after: element.nextSibling?.textContent?.slice(0, 1),
      })),
    ),
  );
  expect(boundaries).toEqual([
    { before: " ", after: " " },
    { before: " ", after: " " },
  ]);

  await firstTrigger.hover();
  await expect(register).toHaveCSS("opacity", "0");
  await expect(firstNote).toHaveCSS("opacity", "1");

  await page.locator("#marginalia-title").hover();
  await firstTrigger.focus();
  await page.keyboard.press("Tab");
  await expect(secondTrigger).toBeFocused();
  await expect(register).toHaveCSS("opacity", "0");
  await expect(secondNote).toHaveCSS("opacity", "1");
});

test("contextual marginalia places every note in narrow reading order", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.evaluate(() => document.fonts.ready);

  const study = page.locator('[data-jbm-study="contextual-marginalia"]');
  await expect(study.locator(".marginalia-register")).toBeHidden();
  await expect(study.locator('[data-note="01"]')).toBeVisible();
  await expect(study.locator('[data-note="02"]')).toBeVisible();

  await study.locator('[data-note-trigger="01"]').click();
  await expect(study.locator('[data-note="01"]')).toHaveCSS("position", "static");
  await expect(study.locator('[data-note="02"]')).toHaveCSS("opacity", "1");
});

test("the complete page remains useful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.locator("[data-principle]")).toHaveCount(8);
  await expect(page.locator("[data-instrument-mark]")).toHaveCount(8);
  await expect(page.locator(".technical-figure")).toBeVisible();
  await expect(page.getByRole("link", { name: /Canonical tokens/ })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute(
    "data-jbm-colorway",
    "terra",
  );
  await expect(page.locator("[data-colorway-preview]")).toBeHidden();

  const firstAnnotation = page.locator('[data-note-trigger="01"]');
  await firstAnnotation.click();
  await expect(page).toHaveURL(/#contextual-note-01$/);
  await page.mouse.move(0, 0);
  await expect(page.locator('[data-note="01"]')).toHaveCSS("opacity", "1");

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
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });

  expect(motion.duration).toBe("0s");
  expect(motion.scrollBehavior).toBe("auto");
  await expect(page.locator('[data-note="01"]')).toHaveCSS(
    "transition-duration",
    "0s",
  );
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
    // Source Serif antialiasing differs between macOS and Linux. Layout,
    // dimensions, overflow, content, and interaction remain exact above.
    maxDiffPixelRatio: 0.05,
  });

  const figure = page.locator(".technical-figure");
  await figure.scrollIntoViewIfNeeded();
  const figureBox = await figure.boundingBox();
  if (!figureBox) {
    throw new Error("Technical Figure has no renderable bounds");
  }

  // Normalize fractional page coordinates so macOS and Linux capture the
  // same integer-sized surface around the fixed-height figure composition.
  const figureScreenshot = await page.screenshot({
    animations: "disabled",
    clip: {
      x: Math.round(figureBox.x),
      y: Math.round(figureBox.y),
      width: Math.round(figureBox.width),
      height: Math.round(figureBox.height),
    },
  });
  expect(figureScreenshot).toMatchSnapshot("reference-site-figure.png", {
    maxDiffPixelRatio: 0.03,
  });

  const marginaliaStudy = page.locator(".marginalia-study");
  await marginaliaStudy.scrollIntoViewIfNeeded();
  await marginaliaStudy.locator('[data-note-trigger="02"]').hover();
  await expect(page).toHaveScreenshot("reference-site-marginalia.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0.03,
  });

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
