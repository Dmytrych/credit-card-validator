import {z} from "zod";
import {AppConfig, configSchema} from "../../common/configuration";

export function loadConfig(): AppConfig {
	try {
		const config: AppConfig = {
			nodeEnv: z.enum(["development", "production", "test"]).parse(process.env.NODE_ENV),
			api: {
				port: z.coerce.number().parse(process.env.PORT),
				host: z.coerce.string().parse(process.env.HOST),
				logLevel: z.coerce.string().parse(process.env.LOG_LEVEL)
			},
			binApi: {
				url: z.coerce.string().parse(process.env.BIN_API_URL),
				apiKey: z.coerce.string().parse(process.env.BIN_API_KEY)
			}
		};

		return configSchema.parse(config);
	} catch (err) {
		console.error(err);
		throw err;
	}
}
