const { DeleteUser } = require('../../../app/actions/user/DeleteUser');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.deleteUser = {
  url: '/users/:id',
  method: 'DELETE',
  handler: async (request, reply) => {
    const { id } = request.params;

    const deleteUser = new DeleteUser(request.server.domainContext);

    await deleteUser.execute(id);

    return reply.code(204).send();
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
    response: {
      204: {
        type: 'null',
      },
    },
  },
};
