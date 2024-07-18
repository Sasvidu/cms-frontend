import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome" && browser.isHeaded) {
          launchOptions.args.push("--incognito");
        }

        return launchOptions;
      });
    },
  },
});
