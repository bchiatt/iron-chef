'use strict';

function Recipe(o){
  this.photo = o.photo;
  this.name = o.name;
  this.ingredients = o.ingredients.split(', ');
  this.directions = o.directions;
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.create = function(o, cb){
  var r = new Recipe(o);
  Recipe.collection.save(r, cb);
};

Recipe.all = function(cb){
  Recipe.collection.find().toArray(cb);
};

module.exports = Recipe;
