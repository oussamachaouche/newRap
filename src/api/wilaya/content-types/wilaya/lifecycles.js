module.exports = {
    beforeCreate(event) {
      const { data, where, select, populate } = event.params;


     // console.log("<<<<<<<<<<before");
      // let's do a 20% discount everytime
      //event.params.data.codeWilaya = event.params.data.codeWilaya * 5;
    },
  
    afterCreate(event) {
      const { result, params } = event;
  //console.log("<<<<<<<<<<after");
  //console.log(event);
      // do something to the result;
    },
  };