/**
 * FeedController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var RSS = require('rss');

module.exports = {
  
  feed: function (req, res){
    rootDomain = sails.config.sitesettings.rootUrl();
    // res.send('what')
    // console.log(req.url)
    // console.log(req.originalUrl)
    // console.log(req.host)
    Article.find().sort('createdAt DESC').populate('comments').exec(function (err, articles){
      if (err) return next(err);

/* lets create an rss feed */
if(articles.length > 0){
  pubDate = articles[0].createdAt
}else{
  pubDate = new Date();
}
var feed = new RSS({
    title: 'title',
    description: 'description',
    feed_url: req.originalUrl,
    site_url: rootDomain,
    image_url: rootDomain+'icon.png',
    // docs: sails.config.sitesettings.rootUrl()+'/rss/docs.html',
    // managingEditor: 'hayk@skyrealre.com',
    // webMaster: 'hayk@skyrealre.com',
    copyright: '2014 '+sails.config.sitesettings.author,
    language: 'en',
    pubDate: pubDate,
    ttl: '60'
});

_.each(articles, function(article){
feed.item({
    author: sails.config.sitesettings.author,
    title: article.title,
    description: article.bodyHTML(),
    url: rootDomain+"/article/"+article.id+"/"+article.cleanTitle(), // link to the item
    // author: 'Guest Author', // optional - defaults to feed author property
    date: article.createdAt, // any format that js Date can parse.
    // lat: 33.417974, //optional latitude field for GeoRSS
    // long: -111.933231, //optional longitude field for GeoRSS
    // enclosure: {url:'...', file:'path-to-file'} // optional enclosure
});


});
/* loop over data and add to feed */

// cache the xml to send to clients
var xml = feed.xml();
      var ctype = {'Content-Type':'application/rss+xml; charset=UTF-8'};
      // res.header(ctype);
      // res.send(xml, {'Content-Type': 'application/rss+xml'}, 200);
      // res.send(xml, { 'Content-Type': 'application/rss+xml' }, 200)
      res.contentType('application/rss+xml; charset=UTF-8')
      res.send(xml);

      // res.send(xml, ctype, 201);
      // res.send('text', { 'Content-Type': 'text/plain' }, 200);

    })
  }
}