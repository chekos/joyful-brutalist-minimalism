import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const baseURL = process.env.JBM_EVIDENCE_URL ?? "http://127.0.0.1:4321";
const outputDirectory = fileURLToPath(
  new URL("../docs/reference-site/v1/", import.meta.url),
);

async function waitForServer(url) {
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The local server may still be starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

await mkdir(outputDirectory, { recursive: true });

const server = process.env.JBM_EVIDENCE_URL
  ? null
  : spawn(process.execPath, ["scripts/serve-static.mjs"], {
      stdio: "inherit",
    });

try {
  await waitForServer(baseURL);

  const browser = await chromium.launch();
  try {
    const keyboardContext = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const keyboardPage = await keyboardContext.newPage();
    await keyboardPage.goto(baseURL);
    await keyboardPage.evaluate(() => document.fonts.ready);
    await keyboardPage.screenshot({
      animations: "disabled",
      path: `${outputDirectory}/desktop-hero.png`,
    });
    await keyboardPage.keyboard.press("Tab");
    await keyboardPage.screenshot({
      animations: "disabled",
      path: `${outputDirectory}/keyboard-focus.png`,
    });
    await keyboardPage.reload();
    await keyboardPage.evaluate(() => document.fonts.ready);
    const marginaliaStudy = keyboardPage.locator(".marginalia-study");
    await marginaliaStudy.locator('[data-note-trigger="02"]').hover();
    await marginaliaStudy.screenshot({
      animations: "disabled",
      path: `${outputDirectory}/contextual-marginalia.png`,
    });
    await keyboardPage.locator(".technical-figure").screenshot({
      animations: "disabled",
      path: `${outputDirectory}/technical-figure.png`,
    });
    await keyboardPage.goto(`${baseURL}/constitution/`);
    await keyboardPage.evaluate(() => document.fonts.ready);
    await keyboardPage.screenshot({
      animations: "disabled",
      path: `${outputDirectory}/constitution.png`,
    });
    await keyboardPage.goto(baseURL);
    await keyboardPage.evaluate(() => document.fonts.ready);
    const colorPlate = keyboardPage.locator(".color-plate");
    for (const colorway of ["terra", "sage", "sky"]) {
      await keyboardPage
        .locator(`[data-colorway-option="${colorway}"]`)
        .click();
      await keyboardPage.evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          ),
      );
      await colorPlate.screenshot({
        animations: "disabled",
        path: `${outputDirectory}/colorway-${colorway}.png`,
      });
    }
    await keyboardContext.close();

    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(baseURL);
    await mobilePage.evaluate(() => document.fonts.ready);
    await mobilePage.screenshot({
      animations: "disabled",
      path: `${outputDirectory}/mobile-hero.png`,
    });
    await mobileContext.close();

    const reducedContext = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 1440, height: 1000 },
    });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(baseURL);
    await reducedPage.evaluate(() => document.fonts.ready);
    await reducedPage.locator("[data-instrument-mark]").nth(4).click();
    await reducedPage.locator(".reading-instrument").screenshot({
      animations: "disabled",
      path: `${outputDirectory}/reduced-motion.png`,
    });
    await reducedContext.close();
  } finally {
    await browser.close();
  }
} finally {
  server?.kill("SIGTERM");
}

console.log(
  `captured desktop, mobile, keyboard, colorway, contextual-marginalia, technical-figure, constitution, and reduced-motion evidence in ${outputDirectory}`,
);
