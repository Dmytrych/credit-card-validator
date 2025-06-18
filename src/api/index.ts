import Fastify, {FastifyInstance} from 'fastify'
import {registerRoutes} from "./routes";
import {jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import {diContainer, fastifyAwilixPlugin} from '@fastify/awilix'
import {AppConfig} from "../common/configuration";
import load from "./container";
import {getErrorHandler} from "./error-handler";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const initPlugins = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyAwilixPlugin, {
    container: diContainer,
    disposeOnClose: true,
    asyncDispose: true,
    asyncInit: true,
    eagerInject: true,
    disposeOnResponse: false,
  })

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  await fastify.register(fastifySwagger, {
    transform: jsonSchemaTransform
  })

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/swagger'
  })
}

export const initApi = async (config: AppConfig) => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
      level: config.api.logLevel
    }
  }).withTypeProvider<ZodTypeProvider>();

  await initPlugins(fastify);

  fastify.diContainer.register(load(config, fastify.log))

  fastify.setErrorHandler(
    getErrorHandler(config.nodeEnv === 'development')
  )

  await fastify.register(registerRoutes, { prefix: '/v1' })

  try {
    await fastify.listen({ port: config.api.port, host: config.api.host })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  return fastify
}
