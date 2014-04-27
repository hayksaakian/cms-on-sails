/**
 * Models
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 */

var connection = 'someMongodbServer';
if(process.env.NODE_ENV === 'development'){
  connection = 'localDiskDb';
}

module.exports.models = {
 
  // Your app's default connection.
  // i.e. the name of one of your app's connections (see `config/connections.js`)
  //
  // (defaults to localDiskDb)
  connection: connection
};
