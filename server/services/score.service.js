var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');
var ObjectId = require('mongodb').ObjectId;

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function update(score) {
  var set = {
    score: score[0]
  };

  var deferred = Q.defer();
  var highscore = score[0];
  var id = score[1];
  console.log("findone");

   db.users.findOne(ObjectId(id), function (err) {
    if (err) deferred.reject(err.name + ': ' + err.message);
     console.log("found something");

     if (ObjectId(id)) {
       console.log("found", id);

       db.users.update(
         { _id: mongo.helper.toObjectID(id) },
         { $set: set },
         function (err, doc) {
           console.log("founded ++", id);
           if (err) deferred.reject(err.name + ': ' + err.message);

           deferred.resolve();
         });
     }
     });



}

function getAll() {

  console.log("Getall - Server - Service");
  var deferred = Q.defer();
//var foundUsers =  db.users.find().sort( { nickname: -1} )

 // db.users.find( { $query: {}, $orderby: { score : -1 } }, function()  {

 // });

  db.users.find( { } , { nickname: 1, score: 1, _id: 0}).sort( { score: -1 } ).limit(10).toArray(function (err, users) {

      // return users (without hashed passwords)
      users = _.map(users, function (user)  {
        console.log(user);
        return _.omit(user, 'hash');

      });
    deferred.resolve(users);
  });

  // db.users.find().toArray(function (err, users) {
  //   if (err) deferred.reject(err.name + ': ' + err.message);
  //
  //   // return users (without hashed passwords)
  //   users = _.map(users, function (user)  {
  //     console.log(users);
  //     getNick(users);
  //     return _.omit(user, 'hash');
  //
  //   });
  //
  //   deferred.resolve(users);
  // });

}

function getNick(users) {


}

function authenticate(score) {
  var deferred = Q.defer();

}

function getById(score) {
  var deferred = Q.defer();

}

function create(score) {
  var deferred = Q.defer();

}

function _delete(score) {
  var deferred = Q.defer();

}




