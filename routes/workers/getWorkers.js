// @ts-nocheck
const { workerRepository } = require('./../../repositories/worker.repo');

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  getWorkers: {
    url: '/workers',
    method: 'GET',
    schema: {
      querystring: {
        type: 'object',
        properties: {
          term: { type: 'string' },
          page: { type: 'number' },
          limit: { type: 'number' },
          sort: { type: 'string' },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const {
          term = '',
          page = 1,
          limit = 10,
          sort = 'createdAt',
        } = request.query;

        const offset = (page - 1) * limit;

        const list = await workerRepository.find({
          term,
          limit,
          offset,
          sort,
        });

        return reply.code(200).send(list);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Failed to fetch workers' });
      }
    },
  },
};
