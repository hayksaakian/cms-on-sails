/**
 * CommentController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	create: function (req, res, next) {
    badguy = false;
    console.log('creating comment')
    // block bots
    if(req.param('address') !== 'http://'){
      console.log('we got a bot by the address')
      badguy = true
      return res.badRequest();
    }
    tarp_fields = ['contact', 'message']
    _.each(tarp_fields, function (tarp) {
      if(req.param(tarp).length > 0){
        console.log('we got a bot')
        badguy = true;
        return res.badRequest();
      }
    })
    //
    if(!badguy){
      console.log('all clear')
      Comment.create(req.params.all()).exec(function (err, comment) {
        if (err) return next(err);
        // console.log('done creating comment')
        // console.log(comment)
        // console.log(comment.article);
        Article.findOne({id: comment.article}).exec(function (err, article) {
          if (err) return next(err);
          // console.log(article);
          var s = '/article/'+article.id+'/'+article.clean_title;
          // console.log(s)
          res.redirect(s);
        })
      })
    }
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
