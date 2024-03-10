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
    try {
      const { body } = ctx.request;
      const { nom, prenom,email,raisonsociale, codePrestataire } = body.data || {}; // Destructure nom and prenom from body.data
  
      // Generate random password
      const generateRandomPassword = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password += characters[randomIndex];
        }
        return password;
      };
  
      const password = generateRandomPassword(8);
      
    
      // Concatenate nom and prenom to create a username
      let userName = (nom ? nom.trim() + '.' : '') + (prenom ? prenom.trim() : '');
  
      // Fetch existing reparateurs
      const reparateurs = await strapi.entityService.findMany('api::reparateur.reparateur');
      // Check if the username already exists
      let existUser = reparateurs.some(reparateur => reparateur.login === userName);
  
      // If the username already exists, append a random number until it becomes unique
      while (existUser) {
        userName += Math.floor(Math.random() * 9999);
        existUser = reparateurs.some(reparateur => reparateur.login === userName);
      }
  
      // Assign the generated username to the body
      body.data.login = userName;
      const erreurs = {};
      // Create the entity and return the response
      let testRaisonSociale = reparateurs.some(reparateur => reparateur.raisonsociale === raisonsociale);
      let testCodePrestataire = reparateurs.some(reparateur => reparateur.codePrestataire === codePrestataire);
      if (testRaisonSociale) return erreur("Un réparateur existe déjà avec cette raison sociale","raisonSociale");
      if (testCodePrestataire) return erreur("Un réparateur existe déjà avec ce code prestataire","codePrestataire");
      
          function erreur(message,champs){
            erreurs[champs] = message;
            return erreurs;
          }
 // Début de la transaction


// create a user  
let user = await strapi.plugins['users-permissions'].services.user.add({
  blocked: false,
  confirmed: true, 
  username: userName,
  email: email,
  password: 'secretpassword', //will be hashed automatically
  provider: 'local', //provider
  created_by: 1, //user admin id
  updated_by: 1, //user admin id
  role: 3 //role id
});

body.data.users_permissions_user = user.id;
body.data.slug = body.data.codePrestataire;

const response = await super.create(ctx);
response.data.attributes.password = password;

      return response;
    } catch (error) {
      // const entry = await strapi.plugins['users-permissions'].services.user.remove({id});
      console.error("Error creating entity:", error);
      // Handle the error or rethrow it if you want to propagate it further
      throw error;
    }

  },


})
);