'use strict';

/**
 * wilaya controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wilaya.wilaya',
({ strapi }) => ({
  /**
   * Example 1: Modifying a Strapi controller function
   *
   * If you need to modify the input or output of a pre-defined Strapi controller method,
   * write a method of the same name, and use `super` to call the parent method.
   * */


  async create(ctx) {
    // some logic here
 

   // ctx.request.body.data.codeWilaya = String(parseInt(ctx.request.body.data.codeWilaya) + 2);

    const response = await super.create(ctx);
    // some more logic
 
//     let user = await strapi.plugins['users-permissions'].services.user.add({
//         blocked: false,
//         confirmed: true, 
//         username: 'new_username',
//         email: 'test@testemail.com',
//         password: 'secretpassword', //will be hashed automatically
//         provider: 'local', //provider
//         created_by: 1, //user admin id
//         updated_by: 1, //user admin id
//         role: 1 //role id
//     });
//  console.log("user"+user);

    return response;
  },


  async find(ctx) {

    
    // your custom logic for modifying the input
    ctx.query = { ...ctx.query, locale: "en" }; // force ctx.query.locale to 'en' regardless of what was requested

    // Call the default parent controller action
    const result = await super.find(ctx);

    // your custom logic for modifying the output
    result.meta.date = Date.now(); // change the date that is returned

    return result;
  },

  /**
   * Example 2: Replacing a Strapi controller function
   *
   * If you need to completely replace the behavior of a pre-defined Strapi controller method,
   * you can do so by simply implementing a method of the same name.
   *
   * Caution: You will need to manage the security of the request and results on your own,
   * as demonstrated in this example.
   * */
  async find(ctx) {
    // validateQuery throws an error if any of the query params used are inaccessible to ctx.user
    // That is, trying to access private fields, fields they don't have permission for, wrong data type, etc
    await this.validateQuery(ctx);
    
    // sanitizeQuery silently removes any query params that are invalid or the user does not have access to
    // It is recommended to use sanitizeQuery even if validateQuery is used, as validateQuery allows
    // a number of non-security-related cases such as empty objects in string fields to pass, while sanitizeQuery
    // will remove them completely
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    
    // Perform whatever custom actions are needed
    const { results, pagination } = await strapi
      .service("api::wilaya.wilaya")
      .find(sanitizedQueryParams);
      
    // sanitizeOutput removes any data that was returned by our query that the ctx.user should not have access to
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    // transformResponse correctly formats the data and meta fields of your results to return to the API
    return this.transformResponse(sanitizedResults, { pagination });
  },


  //  async exampleAction(ctx) {

  //  var i = 0;
   
    
  


    
  //     for(i=0; i<ctx.request.body.data.length;i++){
  //       const data = ctx.request.body.data[i];
  //       ctx.request.body.data = data
        
  //       this.create(ctx);
  //      console.log(ctx.request.body.data);
  //     }
  //     return "ok";
  // },


  /**
   * Example 3: Writing your own new controller function
   * If you need to create some new action that does not match one of the pre-configured Strapi methods,
   * you can simply add the method with the desired name and implement whatever functionality you want.
   *
   * Caution: Similar to replacing a controller, you will need to manage the security of the request
   * yourself, so remember to use sanitizers and validators as needed.
   * */
  async healthCheck(ctx) {
    ctx.body = "ok";
  },




})
);