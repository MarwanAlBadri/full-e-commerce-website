import { defineConfig } from "@playwright/test";

const LOCAL_URL = "http://localhost:5173";
/** Set BASE_URL to run the same tests against the deployed site. */
const deployedUrl = process.env.BASE_URL;

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    reporter: [["list"], ["html", { open: "never" }]],
    use: {
        baseURL: deployedUrl ?? LOCAL_URL,
        trace: "retain-on-failure",
    },
    projects: [
        { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
        {
            name: "tablet",
            use: { viewport: { width: 768, height: 1024 }, isMobile: true, hasTouch: true },
        },
        {
            name: "mobile",
            use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true },
        },
    ],
    // The dev server is only needed when testing locally.
    webServer: deployedUrl
        ? undefined
        : {
              command: "npm run dev -- --port 5173 --strictPort",
              url: LOCAL_URL,
              reuseExistingServer: true,
          },
});
