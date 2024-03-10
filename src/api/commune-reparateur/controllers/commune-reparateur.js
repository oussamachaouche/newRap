'use strict';

/**
 * commune-reparateur controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::commune-reparateur.commune-reparateur', ({ strapi }) => ({
    async findAll(ctx) {
        const {codeWilayas} = ctx.params;
      const entries = await strapi.entityService.findMany("api::commune-reparateur.commune-reparateur", {
        populate: { wilaya: {fields: ['codeWilaya']}}
      });
      console.log(JSON.stringify(entries));
      const feltred = entries.filter(commune => commune.wilaya?.codeWilaya == codeWilayas);
      const filteredResult = feltred.map(({ id, nomCommune }) => ({ id, nomCommune }));

     ctx.body = filteredResult;
    },
  }));
