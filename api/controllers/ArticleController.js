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
    // this kind of sorting is broken locally
    // https://github.com/balderdashy/sails-disk/issues/19
    Article.find().sort('createdAt DESC').populate('comments').exec(function (err, articles){
      if (err) return next(err);
      // console.log(articles)
      // console.log(Object.keys(req))
      // console.log(Object.keys(req.options))
      // console.log(Object.keys(req.params))
      // console.log(req.wantsJSON)
      // res.json(articles)
      articles = articles || []
      res.view('article/index', {
        articles: articles,
        page_title: "business, code, and problem solving in " + articles.length + " articles"
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
      res.view({article: article, comments: comments, page_title: article.title});
    }).fail(function(err){
      return next(err);
      res.redirect('/');
    });
  },

  /**
   * `ArticleController.new`
   */

  new: function (req, res) {
    return res.view({page_title: 'New Article'});
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
