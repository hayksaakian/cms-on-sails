/**
* Article.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment')
var markdown = require('markdown').markdown;

module.exports = {

  attributes: {

    title : { type: 'string' },

    body : { type: 'string' },

    comments : {
      collection: 'article'
    },
    published_at: function(){
      return moment(this.createdAt).format('LLL')
    },
    bodyHTML: function(){
      return markdown.toHTML(this.body)
    }
  }
};

