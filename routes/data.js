var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
parseString(xml, function (err, result) {
    console.dir(result);
});
 var db = require('../helpers/db');
 var Car = require('../models/car');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/import', function(req, res, next) {
  res.render('dataimport');
});

router.get('/find', function(req, res, next){
  var result = {};
  Car.find({}, function(err, users) {
    if (err) throw err;

    // object of all the users
    result = users;
    res.send(JSON.stringify(result));
  });
  //res.render('index', { title: 'Find' });
});

router.get('/getYears', function(req, res){
  Car.find().distinct('year',function(err, year){
    if (err) throw err;
    year.sort().reverse();
    res.send(JSON.stringify(year));
  });
});

router.get('/getMakes', function(req, res){
  var year = req.query.year;
  console.log(year);
  Car.find({year: year}).distinct('make',function(err, make){
    if (err) throw err;
    make.sort();
    res.send(JSON.stringify(make));
  });
});

router.get('/getModels', function(req, res){
  var year = req.query.year;
  var make = req.query.make;
  Car.find({year: year, make: make}, function(err, model){
    if (err) throw err;
    res.send(JSON.stringify(model));
  });
})

router.post('/import1', function(req, res){
  var input = JSON.parse(req.body.car);
  console.log(input);
  var car = new Car({
    id: input.id,
    year: Number(input.year),
    make: input.make,
    model: input.model,
    trans: input.trans,
    hwy: Number(input.hwy),
    city: Number(input.city)
  });
  var result = car.save();
  console.log(result);
  res.send('true');
});
module.exports = router;
