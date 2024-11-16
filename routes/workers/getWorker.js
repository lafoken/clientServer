// @ts-nocheck
const { workerRepository } = require('./../../repositories/worker.repo');

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  getWorker: {
    url: '/workers/:id',
    method: 'GET',
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
    handler: async (request, reply) => {
      try {
        const targetId = request.params.id;

        const found = await workerRepository.findByPK(targetId);

        if (!found) {
          return reply.code(404).send({
            message: 'Worker not found',
          });
        }

        return reply.code(200).send(found);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Failed to fetch worker' });
      }
    },
  },
};
