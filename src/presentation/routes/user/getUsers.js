const { GetUsers } = require('../../../app/actions/user/GetUsers');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getUsers = {
  url: '/users',
  method: 'GET',
  handler: async (request, reply) => {
    const getUsers = new GetUsers(request.server.domainContext);

    const users = await getUsers.execute();

    return reply.code(200).send(users);
  },
  schema: {
    tags: ['Users'],
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
          required: ['id', 'name', 'email'],
        },
      },
    },
  },
};
