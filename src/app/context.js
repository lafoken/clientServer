const { jwtService } = require('./../domain/services/jwt.service');
const { AuthService } = require('./../domain/services/auth.service');

const repositories = {
  ...require('./../infra/repositories/user.repo')
};

const services = {
  jwtService,
  authService: new AuthService({
    ...repositories,
    jwtService,
  }),
};

const domainContext = /** @const */ {
  ...repositories,
  ...services,
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
