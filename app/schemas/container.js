var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ContainerSchema = new mongoose.Schema({
    image: String,
    hostname: String,
    id: String,
    warnings: [],

    user: {type: ObjectId, ref: 'User'},
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

ContainerSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
})

ContainerSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.updateAt').exec(cb)
    },

    findById: function(id,cb){
        return this.findOne({_id: id}).exec(cb)
    }
}

module.exports = ContainerSchema