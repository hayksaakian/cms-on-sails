/**
* Article.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment')
var markdown = require('markdown').markdown;
var scrub = require('url-seo-scrubber');

module.exports = {

  attributes: {

    title : { type: 'string' },
    cleanTitle: function(){
      return scrub(this.title);
    },

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

