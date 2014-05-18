/**
 * CommentController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	create: function (req, res) {
    console.log('creating comment')
    Comment.create(req.params.all()).exec(function (err, comment) {
      if (err) return next(err);
      console.log('done creating comment')
      console.log(comment)
      console.log(comment.article);
      Article.findOne({id: comment.article}).exec(function (err, article) {
        if (err) return next(err);
        console.log(article);
        var s = '/article/'+article.id+'/'+article.clean_title;
        console.log(s)
        res.redirect(s);
      })
    })
  },
  destroy: function(req, res) {
    console.log('destroying comment')
    Comment.findOne(req.param('id')).populate('article').exec(function (err, comment) {
      if(err) return next(err);
      console.log('destroying')
      article_id = comment.article.id
      article_title = comment.article.clean_title
      comment.destroy(function (err) {
        res.redirect('/article/'+article_id+'/'+article_title)
      })
    })
  }
};
