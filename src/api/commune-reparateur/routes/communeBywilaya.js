
module.exports = {
    routes: [
      {
        method: "GET",
        path: "/communesByWilayas/:codeWilayas",
        handler: "commune-reparateur.findAll",
      },
    ],
  };