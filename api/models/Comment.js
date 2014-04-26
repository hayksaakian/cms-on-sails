/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment')

module.exports = {

  attributes: {
    owner: 'string',
    text: 'string',
    article: {
      model: 'article'
    },
    published_at: function(){
      return moment(this.createdAt).format('LLL')
    }
  }
};

