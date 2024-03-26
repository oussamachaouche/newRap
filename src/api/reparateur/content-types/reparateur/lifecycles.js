const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;
//'use strict';

const axios = require('axios');
module.exports = {
 async  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    // let's do a 20% discount everytime
 
     
    let okay = false;

    // Throwing an error will prevent the entity from being created
    if (!okay) {
      throw new ApplicationError('Something went wrong', { foo: 'bar' });
    }





     const id = data.wilaya.connect[0].id !== undefined ? data.wilaya.connect[0].id : data.wilaya.connect[0];

     //const idcommune = data.commune_reparateur.connect[0].id;
     const idcommune = data.wilaya.connect[0].id !== undefined ? data.commune_reparateur.connect[0].id : data.commune_reparateur.connect[0];
   
    
    const commune = await strapi.entityService.findOne('api::commune-reparateur.commune-reparateur',idcommune, {
      populate: '*',
    });
    const wilaya = await strapi.entityService.findOne('api::wilaya.wilaya',id);


    if(commune.wilaya.codeWilaya != wilaya.codeWilaya ){
    

    // Throwing an error will prevent the entity from being created
    throw new ApplicationError("string here");
      throw new ApplicationError("La commune nappartient pas à la wilaya.",true);
    }


    // https://wfe-inbox.kepler-technologies.com/user

     
    
  },

  async afterCreate(event) {
    const { result, params } = event;
   
      const test = result; 
      test.wilaya = params.data.wilaya.connect[0].id;
     

      console.log("After<<<");

      const payload = {
        email: test.email,
        username: test.login,
        password: "Kepler123",
        firstname: test.nom,
        lastname: test.prenom,
        tenantId: 1
        // Si nécessaire, ajoutez d'autres propriétés et effectuez le mappage ici
      };




  try {
    const response = await axios.post("https://wfe-inbox.kepler-technologies.com/user", payload);
    const responseData = response.data;

    
   
      console.log("status<<<<<<<<<<<:", response.status);
 

    console.log(responseData);
  } catch (error) {
    console.log("Erreur lors de la requête:", error.response.status);
    if (error.response && error.response.data && error.response.data.message) {
      // Si la réponse contient un champ "message", c'est probablement un message d'erreur de l'API
      const errorMessage = error.response.data.message;
      console.error('Erreur lors de la requête :', errorMessage);
    } else {
      // Si la réponse ne contient pas de champ "message", affichez simplement l'erreur brute
      console.error('Erreur lors de la requête<<<<<<< :', error);
    }
    const deletedRepar =  await strapi.entityService.delete('api::reparateur.reparateur', test.id);
    console.log("deletedUser<<<<<<",deletedRepar);

   
  }

   
      


    // const response = await axios.post("http://localhost:3000/api/data", event);

    // // Récupérer les données retournées par l'API
    // const responseData = response.data;

    // Utiliser les données retournées
    //console.log("Données retournées par l'API Express :", responseData);
   
    // do something to the result;
  },


};