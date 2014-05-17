/**
 * CommentController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	create: function (req, res) {
    Comment.create(req.params.all(), function (err, comment) {
      if (err) return next(err);
      console.log(comment)
      res.redirect('/article/'+comment.article.id+'/'+comment.article.clean_title);      
    })
  },
  destroy: function(req, res) {
    Comment.findOne(req.param('id'), function (err, comment) {
      article_id = comment.article.id
      article_title = comment.article.clean_title
      comment.destroy(function (err) {
        res.redirect('/article/'+article_id+'/'+article_title)
      })
    })
  }
};
