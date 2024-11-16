const {
  postgresAdapter: { $prisma },
} = require('../adapters/postgres');

// WorkerRepository using Prisma

/**
 * @description A repository for managing workers
 */
class WorkerRepository {
  /** @type { import('@prisma/client').PrismaClient} */
  #prisma;

  constructor() {
    this.#prisma = $prisma;
  }

  /**
   * Create a new worker with the given data
   * @param {WorkerShape} data
   * @returns {Promise<TWorker>}
   */
  async create(data) {
    return await this.#prisma.worker.create({
      data,
    });
  }

  /**
   * @template  PK
   * Read a worker with the given ID
   * @param {string} [id]
   */
  async findByPK(id) {
    const worker = await this.#prisma.worker.findUnique({
      where: { id },
    });

    if (!worker) {
      throw new Error('Worker not found');
    }

    return worker;
  }

  /**
   * Find workers using the provided query parameters
   * @param {Object} query
   * @param {string} [query.term]
   * @param {number} [query.limit]
   * @param {number} [query.offset]
   * @param {keyof TWorker} [query.sort]
   * @returns {Promise<TWorker[]>}
   */
  async find({ term, limit, offset, sort }) {
    const workers = await this.#prisma.worker.findMany({
      where: term ? { name: { contains: term } } : {},
      skip: offset,
      take: limit,
      orderBy: { [sort]: 'desc' },
    });

    return workers;
  }

  /**
   * Update a worker with the given ID using the provided data
   * @param {string} id
   * @param {WorkerShape} data
   * @returns {Promise<TWorker>}
   */
  async update(id, data) {
    return await this.#prisma.worker.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a worker with the given ID
   * @param {string} id
   * @returns {Promise<TWorker>}
   */
  async delete(id) {
    return await this.#prisma.worker.delete({
      where: { id },
    });
  }
}

module.exports.workerRepository = new WorkerRepository();

// Type definitions

/**
 * @typedef {import("@prisma/client").Worker} TWorker
 */

/**
 * @typedef {{
 *  name: string,
 *  role: string,
 *  experience: number,
 *  hourlyRate: number,
 * }} WorkerShape
 */
