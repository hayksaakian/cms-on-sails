/**
 * Routes
 *
 * Your routes map URLs to views and controllers.
 * 
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.) 
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg` 
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or 
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {


  // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
  // default view engine) your home page.
  // 
  // (Alternatively, remove this and add an `index.html` file in your `assets` directory)
  '/': 'ArticleController.index',
  // '/about': 'StaticController.about',
  // '/contact': 'StaticController.contact',
  'get /article' : 'ArticleController.index',
  'post /article' : 'ArticleController.create',
  'get /article/new' : 'ArticleController.new',
  'get /article/:id/edit' : 'ArticleController.edit',
  'post /article/:id/update' : 'ArticleController.update',
  'get /article/:id' : 'ArticleController.show',
  'get /article/:id/:slug?' : 'ArticleController.show',

  'post /comment' : 'CommentController.create',
  'post /comment/:id/delete' : 'CommentController.destroy',

  'get /feed' : 'FeedController.feed',

  'post /session' : 'SessionController.create',
  'get /admin' : 'SessionController.new',
  'get /admin/edit' : 'UserController.edit',
  'post /admin/update' : 'UserController.update',
  '/session/destroy' : 'SessionController.destroy',

  // Custom routes here...

  'get /page':'PageController.index',
  'post /page':'PageController.create',
  'get /page/new':'PageController.new',
  'get /page/:clean_title':'PageController.show',
  'post /page/:clean_title':'PageController.update',
  'get /page/:clean_title/edit':'PageController.edit',

  // wow that's verbose
  'delete /page/:clean_title':'PageController.destroy',
  'post /page/:clean_title/delete':'PageController.destroy',
  'post /page/:clean_title/destroy':'PageController.destroy',


  'get /:clean_title':'PageController.show'

  // If a request to a URL doesn't match any of the custom routes above, it is matched 
  // against Sails route blueprints.  See `config/blueprints.js` for configuration options
  // and examples.

};
