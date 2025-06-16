import { z } from "zod";

export const configSchema = z.object({
  nodeEnv: z.enum(["development", "production"]),
  api: z.object({
    port: z.number(),
    host: z.string()
  })
});

export type AppConfig = z.infer<typeof configSchema>;
