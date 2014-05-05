/**
 * StaticController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  about: function(req, res){
    res.view({page_title: 'About'});
  },
  contact: function(req, res){
    res.view({page_title: 'Contact'});
  } 
};
