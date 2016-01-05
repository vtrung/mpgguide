var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carSchema = new Schema({
  id: { type : String , unique : true, required : true},
  year: Number,
  make: String,
  model: String,
  trans: String,
  hwy: Number,
  city: Number
});
var Car = mongoose.model('Car', carSchema);

// carSchema.pre('save',function(next, done){
//   var self = this;
//     Car.findOne({id : self.id},function(err, car) {
//         console.log("===car===");
//         console.log(car);
//         if(err) {
//             done(err);
//         } else if(car) {
//             self.update();
//             done(new Error("username must be unique"));
//         } else {
//             done();
//         }
//     });
//     next();
// });
module.exports = Car;
