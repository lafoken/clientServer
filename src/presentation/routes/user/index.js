const { createUser } = require('./createUser');
const { getUser } = require('./getUser');
const { deleteUser } = require('./deleteUser');
const { updateUser } = require('./updateUser');
const { getUsers } = require('./getUsers');
/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.userRouter = async function (fastify, opts) {
  fastify.route(getUser);
  fastify.route(createUser);
  fastify.route(deleteUser);
  fastify.route(updateUser);
  fastify.route(getUsers);
};
