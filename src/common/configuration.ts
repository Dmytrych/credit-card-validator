import { z } from 'zod';

export const configSchema = z.object({
	nodeEnv: z.enum(['development', 'production', 'test']),
	api: z.object({
		port: z.number(),
		host: z.string(),
		logLevel: z.string().default('info')
	}),
	binApi: z.object({
		url: z.string(),
		apiKey: z.string()
	})
});

export type AppConfig = z.infer<typeof configSchema>;
