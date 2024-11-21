const { GetUsers } = require('../../../app/actions/user/GetUsers');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getUsers = {
  url: '/users',
  method: 'GET',
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid reference
    const { term, limit, page, sort } = request.query;

    const offset = limit * (page - 1);

    const getUsers = new GetUsers(request.server.domainContext);

    const users = await getUsers.execute({
      term,
      sort,
      limit,
      offset,
    });

    return reply.code(200).send(users);
  },
  schema: {
    tags: ['Users'],
    querystring: {
      type: 'object',
      properties: {
        term: { type: 'string' },
        limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
        page: { type: 'integer', minimum: 1, default: 1 },
        sort: { type: 'string', enum: ['username', 'createdAt'] },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' }, // UUID for user ID
                username: { type: 'string' },
                isPrivileged: { type: 'boolean' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
              required: ['id', 'username', 'isPrivileged', 'createdAt'],
              additionalProperties: false, // Prevent extra properties
            },
          },
          page: { type: 'integer' },
          total: { type: 'integer' },
        },
      },
    },
  },
};
