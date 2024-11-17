const { CreateUser } = require('../../../app/actions/user/CreateUser');

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  createUser: {
    url: '/users',
    method: 'POST',
    bodyLimit: 1024,
    handler: async (request, reply) => {
      const userData = request.body;

      const createUser = new CreateUser(request.server.domainContext);

      // @ts-ignore - This is a valid call
      const user = await createUser.execute(userData);

      return reply.code(201).send(user);
    },
    schema: {
      tags: ['Users'],
      body: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
        additionalProperties: false, // Запобігає додаванню невідомих властивостей
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
          required: ['id', 'name', 'email'], // Відповідь містить обов'язкові поля
        },
      },
    },
  },
};
