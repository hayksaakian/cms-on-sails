/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	



  // admin panel
  panel: function (req, res, next) {
    User.find({}).limit(1).exec(function(err, users) {
      if (err) return next(err);
      user = users[0]
      res.view({user: user})
    })    
  },


  // admin panel
  panel_update: function (req, res, next) {
    // get current settings
    base = sails.config.sitesettings;

    // merge in the user defined settings
    for(var key in req.params.all()){
      if (base.hasOwnProperty(key)) {
        base[key] = req.param(key)
      }
    }

    // persist the settings
    sails.config.sitesettings = base;

    res.redirect('/admin/panel')
  },


  /**
   * `UserController.edit`
   */


  edit: function (req, res, next) {
    User.find({}).limit(1).exec(function(err, users) {
      if (err) return next(err);
      user = users[0]
      res.view({user: user})
    })
  },

  /**
   * `UserController.update`
   */

  update: function (req, res, next) {
    // console.log(req.params.all())
    User.findOne(req.param('id'))
    .then(function (user) {
      uparams = req.params.all();
      // console.log(user)
      uparams.encryptedPassword = user.encryptedPassword;
      var user = User.update({id: user.id}, uparams)
      .then(function (user){
        return user
      })

      return [user]
    }).spread(function (user) {
      res.redirect('/admin')
    }).fail(function (err) {
      return next(err)
      res.redirect('/admin/edit')
    });

    // Article.findOne(req.param('id'))
    // .then(function (article) {
    //   var comments = Comment.find({ article : article.id})
    //   .then(function (comments) {
    //     return comments;
    //   })
    //   return [article, comments]
    // }).spread(function (article, comments) {
    //   res.view({article: article, comments: comments, page_title: article.title});
    // }).fail(function(err){
    //   return next(err);
    //   res.redirect('/');
    // });
  }
};
