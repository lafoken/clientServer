const { getWorker } = require('./getWorker');
const { getWorkers } = require('./getWorkers');
const { createWorker } = require('./createWorker');
const { updateWorker } = require('./updateWorker');
const { deleteWorker } = require('./deleteWorker');

module.exports.workersRouter = async function (fastify, opts) {
  fastify.route(createWorker);
  fastify.route(getWorkers);
  fastify.route(getWorker);
  fastify.route(updateWorker);
  fastify.route(deleteWorker);
};
