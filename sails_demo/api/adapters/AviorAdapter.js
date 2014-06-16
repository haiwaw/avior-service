module.exports = (function () {


  /**
   * AviorAdapter
   * 
   * @module      :: Adapter
   * @description :: A short summary of what this adapter is for and what interfaces it supports.
   * @docs        :: http://sailsjs.org/#!documentation/adapters
   *
   * @syncable    :: false
   * @schema      :: false
   */

  var Adapter = {



    /**
     * registerCollection() is run multiple times (once for each model, aka collection)
     * before the server ever starts.  It allows us to register our models with the
     * underlying adapter interface.  (don't forget to cb() when you're done!)
     */

    registerCollection: function (collection, cb) {
      cb();
    },
      
    find: function(collectionName, options, cb) {},

  };


	return Adapter;
})();
