/**
 * ArticleController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  /**
   * `ArticleController.index`
   */

  index: function (req, res) {
    // console.log(isAuthenticated)
    Article.find().exec(function foundArticle(err, articles){
      if (err) return next(err);
      // console.log(articles)
      res.view('article/index', {
        articles: (articles || [])
      })
    })
  },

  /**
   * `ArticleController.show`
   */

  show: function (req, res) {
    Article.findOne(req.param('id'))
    .then(function (article) {
      var comments = Comment.find({ article : article.id})
      .then(function (comments) {
        return comments;
      })
      return [article, comments]
    }).spread(function (article, comments) {
      res.view({article: article, comments: comments});
    }).fail(function(err){
      return next(err);
      res.redirect('/');
    });
  },

  /**
   * `ArticleController.new`
   */

  new: function (req, res) {
    return res.view();
  },

  // /**
  //  * `ArticleController.create`
  //  */

  create: function (req, res) {
    // console.log('in create!')
    // console.log(req.params.all())
    Article.create(req.params.all(), function (err, article) {
      if (err) return next(err);
      // console.log(article)
      res.redirect('article');      
    })
  },

  /**
   * `ArticleController.edit`
   */

  edit: function (req, res) {
    Article.findOne(req.param('id')).exec(function (err, article){
      if (err) return next(err);
      // console.log(articles)
      res.view({
        article: (article || []),
        error: err
      })
    })
  },

  /**
   * `ArticleController.update`
   */

  update: function (req, res) {
    Article.update({id: req.param('id')}, req.params.all(), function (err, article){
      if (err) return next(err);
      // console.log(articles)
      // flash.message = 'updated article'
      res.redirect('article');
      // res.send(article);
    })
  },

  /**
   * `ArticleController.destroy`
   */

  destroy: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  }
};
