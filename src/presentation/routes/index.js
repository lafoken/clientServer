const { userRouter } = require('./user');
const { walletRouter } = require('./wallet');
/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.patchRouting = (fastify) => {
  // Register routes
  fastify.register(userRouter);
  fastify.register(walletRouter);
};
