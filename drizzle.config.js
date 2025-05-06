import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://ai-interview-mocker_owner:npg_wjfYPct4UF8H@ep-fancy-mode-a5x3f7h6-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require",
  }
});