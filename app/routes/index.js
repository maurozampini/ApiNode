const noteRoutes = require('./note_routes');
const ingredientsRoutes = require('./ingredient_routes');
// const mercadoPagoRoutes = require('./mercado_pago');
const usersRoutes = require('./users_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  ingredientsRoutes(app, db);
  // mercadoPagoRoutes(app, db);
  usersRoutes(app, db);
};