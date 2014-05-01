/**
 * StaticController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  about: function(req, res){
    res.view();
  },
  static: function(req, res){
    res.view();
  } 
};
