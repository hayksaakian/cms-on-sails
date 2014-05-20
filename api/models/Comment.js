/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment')
// var markdown = require('markdown').markdown;
var marked = require('marked');

// TODO sanitize: true in comment markup

module.exports = {

  attributes: {
    owner: 'string',
    text: {
      type:'string',
      required: true
    },
    article: {
      model: 'article'
    },
    published_at: function(){
      return moment(this.createdAt).format('LLL')
    },
    textHTML: function(){
      // return markdown.toHTML(this.text)
      return marked(this.text)
    }
  }
};

