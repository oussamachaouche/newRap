'use strict';

/**
 * A set of functions called "actions" for `management`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }


  
  async changePassword(ctx) {
    const { password } = ctx.request.body;

    const { id } = ctx.request.params;
    
    console.log(password);
    console.log(id);

    let user = await strapi.plugins['users-permissions'].services.user.edit(id,ctx.request.body);

  
     


    return user;
  },


};
