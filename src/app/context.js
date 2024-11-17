
const repositories = {
  ...require('./../infra/repositories/user.repo')
};


const domainContext = /** @const */ {
  ...repositories
};

module.exports.domainContext = Object.freeze(
  Object.assign(Object.create(null), domainContext)
);

// ---------------------------------------------------
// Typedefs
// ---------------------------------------------------
/**
 * @typedef {Readonly<domainContext>} DomainContext
 */
