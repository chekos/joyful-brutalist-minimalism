import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://jbm.bns.studio",
  server: {
    host: "127.0.0.1",
  },
});
