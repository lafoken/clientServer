const { workerRepository } = require('../../repositories/worker.repo');

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  updateWorker: {
    url: '/workers/:id',
    method: 'PUT',
    bodyLimit: 1024,
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        required: ['name', 'role'],
        properties: {
          name: { type: 'string' },
          role: { type: 'string' },
          hourlyRate: { type: 'number' },
          experience: { type: 'number' },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        // @ts-ignore - We know that the params is defined
        const targetId = request.params.id;

        // @ts-ignore - We know that the body is defined in the schema
        const { name, role, experience = 0, hourlyRate = 0 } = request.body;

        const updated = await workerRepository.update(targetId, {
          name,
          role,
          experience,
          hourlyRate,
        });

        return reply.code(200).send(updated);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Failed to update worker' });
      }
    },
  },
};
