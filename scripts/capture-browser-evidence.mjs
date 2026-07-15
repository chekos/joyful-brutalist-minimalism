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
    await keyboardPage.keyboard.press("Tab");
    await keyboardPage.screenshot({
      animations: "disabled",
      path: `${outputDirectory}/keyboard-focus.png`,
    });
    await keyboardContext.close();

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

console.log(`captured keyboard and reduced-motion evidence in ${outputDirectory}`);
