import { configDotenv } from "dotenv";
import { loadConfig } from "../../src/api/config/load-config";
import { FastifyInstance } from "fastify/types/instance";
import { initApi } from "../../src/api";

export function createTestServer(): Promise<FastifyInstance> {
	configDotenv({
		path: '.env.test'
	})

	const config = loadConfig()
	return initApi(config)
}