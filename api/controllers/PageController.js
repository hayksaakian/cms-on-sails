/**
 * PageController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  show: function(req, res, next){
    Page.findOne({clean_title: req.param('clean_title') }).exec(function(err, page){
      if (err) return next(err);
      if (page){
        res.view({page: page, page_title: page.title});
      }else{
        console.log(req.params.all())
        res.send(404)
      }
    })
  },
  index: function(req, res, next) {
    Page.find().exec(function (err, pages) {
      if (err) return next(err);

      res.view({pages: pages, page_title: 'Page Administration'})
    })
  },
  "new": function (req, res, next) {
    return res.view({page_title: 'New Page'});
  },
  create: function (req, res, next) {
    console.log(req.params.all())
    Page.create(req.params.all(), function (err, page) {
      if (err) return next(err);
      // console.log(page)
      console.log(page)
      res.redirect('page');      
    })
  },
  edit: function(req, res, next) {
    Page.findOne({clean_title: req.param('clean_title') }).exec(function(err, page){
    // Page.findOne({clean_title: req.param('clean_title')}).exec(function (err, page){
      if (err) return next(err);
      // console.log(page)
      page = page || {};
      res.view({
        page_title: 'Edit Page - '+page.title,
        page: page,
        error: err
      })
    })
  },
  update: function(req, res, next) {
    Page.update({clean_title: req.param('clean_title')}, req.params.all(), function (err, page){
      if (err) return next(err);
      // console.log(page)
      // flash.message = 'updated page'
      res.redirect('page');
      // res.json(page);
    })
  },
  destroy: function(req, res, next) {
    Page.findOne({clean_title: req.param('clean_title') }).exec(function(err, page){
    // Page.findOne({clean_title: req.param('clean_title')}).exec(function (err, page){
      if (err) return next(err);
      // console.log(page)
      page = page || {};
      
      page.destroy(function (err) {
        res.redirect('/page')
      });
    })
  }
};
