var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var UsercatSchema = new mongoose.Schema({

    name: {type: ObjectId, ref: 'User'},
    containers: [{type: ObjectId, ref: 'Container'}],

    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UsercatSchema.pre('save',function(next){

    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()

})


UsercatSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.updateAt').exec(cb)
    },

    findById: function(id,cb){
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = UsercatSchema

// db.users.update({"_id" : ObjectId("...")},{$set: {role: 51}})