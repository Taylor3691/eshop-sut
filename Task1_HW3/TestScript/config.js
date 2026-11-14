import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const windowsChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

export const config = {
  baseUrl: process.env.ESHOP_BASE_URL || "http://localhost:5173",
  headless: !process.argv.includes("--headed"),
  executablePath:
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync(windowsChrome) ? windowsChrome : undefined),
  timeout: Number(process.env.GUI_TEST_TIMEOUT || 10000),
  viewport: {
    width: Number(process.env.GUI_VIEWPORT_WIDTH || 1440),
    height: Number(process.env.GUI_VIEWPORT_HEIGHT || 900),
  },
  reportDir: path.join(currentDir, "reports"),
};
