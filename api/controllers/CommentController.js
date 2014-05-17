/**
 * CommentController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	create: function (req, res) {
    console.log('creating comment')
    Comment.create(req.params.all(), function (err, comment) {
      if (err) return next(err);
      console.log('done creating comment')
      console.log(comment)
      var s = '/article/'+comment.article.id+'/'+comment.article.clean_title;
      res.redirect(s);
    })
  },
  destroy: function(req, res) {
    console.log('destroying comment')
    Comment.findOne(req.param('id'), function (err, comment) {
      if(err) return next(err);
      article_id = comment.article.id
      article_title = comment.article.clean_title
      comment.destroy(function (err) {
        res.redirect('/article/'+article_id+'/'+article_title)
      })
    })
  }
};
