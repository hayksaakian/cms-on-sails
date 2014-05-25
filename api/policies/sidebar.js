  /**
 * sidebar
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  Page.find().exec(function(err, pages){
    // something like this:
    // {'where': {'in_nav':{'not':false}}}
    // should work, but it doesn't
    pages = pages.filter(function(page){
      return page.in_nav !== false;
    })
    res.locals.nav_pages = pages
    return next()
  })
};
