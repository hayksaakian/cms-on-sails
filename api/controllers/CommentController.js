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
      res.redirect('/article/'+comment.article);      
    })
  }
};
