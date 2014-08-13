'use strict';

var Mongo = require('mongodb');

function Recipe(o){
  this.photo       = o.photo.trim()       ? o.photo : 'http://wonderopolis.org/wp-content/uploads/2010/11/Wonder-46-Cornucopia-Static-Image.jpg';
  this.name        = o.name.trim()        ? o.name : 'cornucopia';
  this.category    = o.category;
  this.ingredients = o.ingredients.trim() ? o.ingredients.split(',').map(function(i){return i.trim();}) : ['fruits', 'grains', 'vegetables'];
  this.directions  = o.directions.trim()  ? o.directions : '1. Find some food. 2 Clean that food. 3. Eat that food.';
  this.time        = new Date();
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.create = function(o, cb){
  var r = new Recipe(o);
  Recipe.collection.save(r, cb);
};

Recipe.all = function(cb){
  Recipe.collection.find().sort({time:-1}).toArray(cb);
};

Recipe.deleteById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Recipe.collection.remove({_id:_id}, cb);
};

module.exports = Recipe;
