module.exports = {
  routes: [
    {
     method: 'PUT',
     path: '/changePassword/:id',
     handler: 'management.changePassword',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
