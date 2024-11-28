const { jwtService } = require('./../domain/services/jwt.service');
const { AuthService } = require('./../domain/services/auth.service');
const { walletService } = require('./../domain/services/wallet.service'); // Імпортуємо walletService

// Імпортуємо репозиторії
const repositories = {
  ...require('./../infra/repositories/user.repo'),
  ...require('./../infra/repositories/wallet.repo'), // Додаємо репозиторій для роботи з гаманцями
};

// Ініціалізація сервісів
const services = {
  jwtService,
  authService: new AuthService({
    ...repositories,
    jwtService,
  }),
  walletService, // Додаємо walletService до сервісів
};

// Об'єднуємо репозиторії та сервіси в один об'єкт domainContext
const domainContext = /** @const */ {
  ...repositories,
  ...services,
};

// Експортуємо domainContext, зробивши його незмінним
module.exports.domainContext = Object.freeze(
  Object.assign(Object.create(null), domainContext)
);

// ---------------------------------------------------
// Typedefs
// ---------------------------------------------------
/**
 * @typedef {Readonly<domainContext>} DomainContext
 */
