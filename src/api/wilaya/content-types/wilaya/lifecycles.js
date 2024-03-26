const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;
module.exports = {
 async  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    // let's do a 20% discount everytime
    event.params.data.nomWilaya = event.params.data.nomWilaya + "test";
     const id =  event.params.data.commune_reparateurs.connect[0].id;
  
    const reparateurs = await strapi.entityService.findOne('api::commune-reparateur.commune-reparateur',id, {
      populate: '*',
    });

    console.log("<<<<<<",event.params.data.codeWilaya);

    console.log("<<<<<<",reparateurs.wilaya.codeWilaya);

    if(reparateurs.wilaya.codeWilaya != event.params.data.codeWilaya){
    let okay = false;

    // Throwing an error will prevent the entity from being created
   
      throw new ApplicationError('c pas la wilaya');
    }
return "succes";
    
  },

  afterCreate(event) {
    const { result, params } = event;
console.log("<<<<<<<<<<<<<<",result);
console.log("<<<<<<<<<<<<<<",params);
    // do something to the result;
  },
};