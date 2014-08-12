/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Recipe    = require('../../app/models/recipe'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'recipe-test';

describe('Recipe', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Recipe object', function(){
      var o = {photo:'http://files.patiodaddiobbq.com/images/food/chicken/BasicChickenDrumsticks_1_5.jpg', name:'bbq chicken', ingredients:'bbq, chicken, water', directions:'1. 2. 3.'};
      var r = new Recipe(o);
      expect(r).to.be.instanceof(Recipe);
      expect(r.photo).to.equal('http://files.patiodaddiobbq.com/images/food/chicken/BasicChickenDrumsticks_1_5.jpg');
      expect(r.name).to.equal('bbq chicken');
      expect(r.ingredients).to.have.length(3);
      expect(r.ingredients[1]).to.equal('chicken');
      expect(r.directions).to.equal('1. 2. 3.');
    });
  });

  describe('.all', function(){
    it('should get all recipes', function(done){
      Recipe.all(function(err, recipes){
        expect(recipes).to.have.length(6);
        done();
      });
    });
  });
});

