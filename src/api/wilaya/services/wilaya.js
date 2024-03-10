'use strict';

/**
 * wilaya service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wilaya.wilaya', ({ strapi }) =>  ({
    // Method 1: Creating an entirely new custom service

  
    // Method 2: Wrapping a core service (leaves core logic in place)
    async find(...args) {  
      // Calling the default core controller
      const { results, pagination } = await super.find(...args);
    //   const entries = await strapi.entityService.findMany('api::wilaya.wilaya', {
    //     populate: '*',
    //   });
    //   console.log(entries);
    //   // some custom logic

  
    //   results.forEach((result, index) => {
    //     result.counter = entries[index].commune_reparateurs;
    //   });

      return { results, pagination };
    },
  
    // Method 3: Replacing a core service
    async findOne(entityId, params = {}) {
      return strapi.entityService.findOne('api::wilaya.wilaya', entityId, this.getFetchParams(params));
    }
  }));