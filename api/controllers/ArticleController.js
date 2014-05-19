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
        page_title: sails.config.sitesettings.blog_tagline+" in " + articles.length + " articles"
      })
    })
  },

  /**
   * `ArticleController.show`
   */

  show: function (req, res) {
    Article.findOne(req.param('id')).populate('comments')
    .then(function (article) {
      return [article, article.comments]
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
    Article.update({id: req.param('id')}, req.params.all(), function (err, articles){
      if (err) return next(err);
      // console.log(articles)
      // flash.message = 'updated article'
      var article = articles[0]
      res.redirect('/article/'+article.id+'/'+article.clean_title);
      // res.send(article);
    })
  },

  /**
   * `ArticleController.destroy`
   */

  destroy: function(req, res, next) {
    Article.findOne({id: req.param('id') }).exec(function(err, article){
    // Page.findOne({clean_title: req.param('clean_title')}).exec(function (err, page){
      if (err) return next(err);
      // console.log(page)
      article = article || {};
      
      article.destroy(function (err) {
        res.redirect('/')
      });
    })
  }
};
