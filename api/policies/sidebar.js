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

  Page.find({'not': {'in_nav':false}}).exec(function(err, pages){
    res.locals.nav_pages = pages
    return next()
  })
};
