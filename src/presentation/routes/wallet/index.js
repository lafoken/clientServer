const { createWallet } = require('./createWallet');
const { getWallets } = require('./getWallets');
/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.walletRouter = async function (fastify, opts) {
  fastify.route(getWallets);
  fastify.route(createWallet);
};
