'use strict';

/**
 * reparateur controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::reparateur.reparateur',
({ strapi }) => ({
  /**
   * Example 1: Modifying a Strapi controller function
   *
   * If you need to modify the input or output of a pre-defined Strapi controller method,
   * write a method of the same name, and use `super` to call the parent method.
   * */


  async create(ctx) {
    // some logic here
   
    const { body } = ctx.request;
   // ctx.request.body.data.codeWilaya = String(parseInt(ctx.request.body.data.codeWilaya) + 2);
   
   const email = body.data.email ;
   const login = body.data.login ;
   
   //const login = ctx.request.body.data.login ; a revoir

    
    // some more logic
 
    let user = await strapi.plugins['users-permissions'].services.user.add({
        blocked: false,
        confirmed: true, 
        username: login,
        email: email,
        password: 'secretpassword', //will be hashed automatically
        provider: 'local', //provider
        created_by: 1, //user admin id
        updated_by: 1, //user admin id
        role: 1 //role id
    });

    console.log("user"+user.password);
    body.data.users_permissions_user = user.id;
    body.data.slug = body.data.codePrestataire;
    const response = await super.create(ctx);

 

    return response;
  },










})
);