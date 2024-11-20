const { CreateWallet } = require('../../../app/actions/wallet/CreateWallet');

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  createWallet: {
    url: '/wallets',
    method: 'POST',
    bodyLimit: 1024,
    handler: async (request, reply) => {
      const walletData = request.body;

      const createWallet = new CreateWallet(request.server.domainContext);

      // @ts-ignore - This is a valid call
      const wallet = await createWallet.execute(walletData);

      return reply.code(201).send(wallet);
    },
    schema: {
      tags: ['Wallets'],
      body: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string' }, // Ідентифікатор користувача для якого створюється гаманець
          balance: { type: 'number', default: 0 }, // Баланс гаманця (за замовчуванням 0)
        },
        additionalProperties: false,
      },
      response: {
        201: {
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
};
