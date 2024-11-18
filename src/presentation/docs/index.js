/**
 * Patch the the fastify instance to add context
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.patchDocs = (fastify) => {
  // Register Swagger plugin
  fastify.register(require('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'User API',
        description: 'API documentation for the user endpoints',
        version: '0.6.0',
      },
      host: 'localhost',
      basePath: '/api',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'Users', description: 'User related end-points' }
      ],
    },
  });

  // Register Swagger UI to expose the documentation
  // @ts-ignore - This is a valid call
  fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs', // The route to access Swagger UI
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    exposeRoute: true,
  });
};
