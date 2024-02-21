'use strict';

/**
 * `customPolicy` policy
 */

module.exports = (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In customPolicy policy.'+policyContext.state.user);

    if ((policyContext.state.user) && policyContext.state.user.role.name === 'Administrator') {
      // Go to next policy or will reach the controller's action.
      return true;
    }
  
    return true;
};
