'use strict';

/**
 * reparateur router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::reparateur.reparateur');

// , {
//     config: {
//       update: {
//         middlewares: ["api::reparateur.is-owner"],
//       },
//       delete: {
//         middlewares: ["api::reparateur.is-owner"],
//       },
//     },
//   });