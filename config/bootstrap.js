/**
 * Bootstrap
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  Setting.find({})
  .then(function (settings_arr) {
    var static_settings = sails.config.sitesettings;

    if(settings_arr.length === 0){
      // persist settings if they've never been persisted
      console.log('settings have never been persisted!')
      var settings = Setting.create(static_settings)
      .then(function (settings) {
        console.log('settings persisted for the first time')
        return settings
      })
    }else{
      console.log('settings found in the database :D')
      var settings = settings_arr[0]

      var need_save = false

      for(var key in static_settings){
        if(settings.hasOwnProperty(key)){}else{
          need_save = true
          console.log('preparing to persist: '+key)
          settings[key] = static_settings[key]
        }
      }

      var settings = settings.save()
      .then(function (settings) {
        if (need_save) {
          console.log('new settings found, and persisted')
        }else{
          console.log('called .save with not changes...')
        }
        return settings
      })
    }
    return [settings]
  })
  .spread(function (settings) {
    console.log('Lifting CMS on Sails with these settings:')
    console.log(settings)
    sails.config.sitesettings = settings
    return cb()
  })
  .fail(function(err){
    console.log(err);
    return cb(err);    
  })
};