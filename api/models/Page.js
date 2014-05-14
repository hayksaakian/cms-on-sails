/**
* Page.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment')
var markdown = require('markdown').markdown;
var scrub = require('url-seo-scrubber');

module.exports = {

  attributes: {
    title : { 
      type: 'string',
      required: true 
    },
    clean_title : { type: 'string' },
    content : { type: 'string' },

    published_at: function(){
      return moment(this.createdAt).format('LLL')
    },
    contentHTML: function(){
      return markdown.toHTML(this.content)
    }
  },
  // Lifecycle Callbacks
  beforeCreate: function(values, next) {
    console.log('beforeCreate')
    console.log(scrub(values.title))
    values.clean_title = scrub(values.title);
    console.log(values)
    next();
  },
  // Lifecycle Callbacks
  beforeUpdate: function(values, next) {
    console.log('beforeUpdate')
    values.clean_title = scrub(values.title);
    console.log(values)
    next();
  }
};

