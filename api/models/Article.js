/**
* Article.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment')
// var markdown = require('markdown').markdown;
var marked = require('marked');
var scrub = require('url-seo-scrubber');

module.exports = {

  attributes: {
    pinned: {
      type: 'boolean',
      defaultsTo: false
    },
    title : { 
      type: 'string',
      required: true 
    },
    clean_title : { type: 'string' },
    cleanTitle: function(){
      if(typeof(this.clean_title) !== typeof('string')){
        this.clean_title = scrub(this.title)
        this.save(function(err) {
          console.log(err);
        });
      }
      return this.clean_title
    },

    body : { type: 'string' },

    comments : {
      collection: 'article'
    },
    published_at: function(){
      return moment(this.createdAt).format('LLL')
    },
    bodyHTML: function(){
      // return markdown.toHTML(this.body)
      return marked(this.body)
    }
  },
  // Lifecycle Callbacks
  beforeCreate: function(values, next) {
    values.clean_title = scrub(values.title);
    next();
  }
};

