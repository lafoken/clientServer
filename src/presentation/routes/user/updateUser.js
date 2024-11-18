const { UpdateUser } = require('../../../app/actions/user/UpdateUser');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.updateUser = {
  url: '/users/:id',
  method: 'PUT',
  handler: async (request, reply) => {
    const { id } = request.params;
    const updateData = request.body;

    const updateUser = new UpdateUser(request.server.domainContext);

    const user = await updateUser.execute(id, updateData);

    return reply.code(200).send(user);
  },
  schema: {
    tags: ['Users'],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        isPrivileged: { type: 'boolean' },
      },
      required: ['username'],
      additionalProperties: false,
    },
    response: {
      200: {
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
};
