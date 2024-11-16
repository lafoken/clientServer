const { workerRepository } = require('./../../repositories/worker.repo');

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  createWorker: {
    url: '/workers',
    method: 'POST',
    bodyLimit: 1024,
    schema: {
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
        const { name, role, experience = 0, hourlyRate = 0 } = request.body;

        const worker = await workerRepository.create({
          name,
          role,
          experience,
          hourlyRate,
        });

        return reply.code(201).send(worker);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Failed to create worker' });
      }
    },
  },
};
