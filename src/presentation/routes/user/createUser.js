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
        required: ['username', 'passwordHash'],
        properties: {
          username: { type: 'string' },
          passwordHash: { type: 'string' },
          isPrivileged: { type: 'boolean', default: false },
        },
        additionalProperties: false,
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            username: { type: 'string' },
            isPrivileged: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'username', 'isPrivileged', 'createdAt'],
        },
      },
    },
  },
};
