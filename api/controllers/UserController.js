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
    // step 0:
    // save sails.config.sitesettings;
    // to the database

    // step 1:
    // get current settings
    Setting.find({}).limit(1).exec(function(err, settings_arr){
      if(err) return next(err);
      // there should always be at least one settings object
      // before this request is ever made
      // make sure it's created when sails is lifted
      settings = settings_arr[0]

      // step 2:
      // merge in the user defined settings
      all_params = req.params.all()
      for(var key in all_params){
        if (settings.hasOwnProperty(key)) {
          // handle boolean values that html forms render as string
          the_val = req.param(key)
          if(the_val === 'true' || the_val === 'false'){
            the_val = the_val === 'true'
          }
          settings[key] = the_val
        }
      }
      // console.log('about to save:')
      // console.log(settings)
      // persist the settings to storage
      Setting.update({id: settings.id}, settings, function (err, settings_arr) {
        if(err) return next(err);
        // persist the settings to memory
        // console.log(settings_arr)
        sails.config.sitesettings = settings_arr[0];

        res.redirect('/admin/panel')
      })
    })

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
