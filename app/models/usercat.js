var mongoose = require('mongoose')
var UsercatSchema = require('../schemas/usercat')
var Usercat = mongoose.model('Usercat',UsercatSchema)
module.exports = Usercat