const { GetWallets } = require('../../../app/actions/wallet/GetWallets');

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  getWallets: {
    url: '/wallets',
    method: 'GET',
    handler: async (request, reply) => {
      const getWallets = new GetWallets(request.server.domainContext);

      const wallets = await getWallets.execute();

      return reply.code(200).send(wallets);
    },
    schema: {
      tags: ['Wallets'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              userId: { type: 'string' },
              balance: { type: 'number' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'userId', 'balance', 'createdAt'],
          },
        },
      },
    },
  },
};
