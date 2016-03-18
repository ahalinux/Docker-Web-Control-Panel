var User = require('../models/user')
var Container = require('../models/container')
var Usercat = require('../models/usercat')
var Execcommand = require('./command/execcmd.js')
var system = {}


exports.index = function(req,res){
    Execcommand.getAllData(function(allDataObj){
        //console.log(allDataObj)
        res.render('index',{
            title: '首页',
            system:allDataObj
        })
    })
}


exports.userconindex = function(req,res){
    var userId = req.session.user._id   //拿到用户ID进行容器分页
    var page = parseInt(req.query.p, 10) || 0
    var count = 3
    var index = page * count
    var q = req.query.q //拿到容器搜索请求

    if(q){
        //user容器搜索开发中
    }else{
        //分页列出user容器列表
        Usercat.findOne({name: userId})
            .populate({
                path: 'containers'
                //options: {limit: 3, skip: index}
            })
            .exec(function(err, usercat){

                //进行分页
                var containers = usercat.containers || []
                var results = containers.slice(index, index + count)

                res.render('userconindex',{
                    title: '用户面板',
                    //user: usercat,
                    createcon: {},
                    currentPage: (page + 1),
                    query: 'user=' + userId,
                    totalPage: Math.ceil(containers.length / count),
                    ucontainers: results
                })

            })
    }
}


exports.superconindex = function(req,res){
    var userId = req.session.user._id   //拿到用户ID进行容器分页
    var page = parseInt(req.query.p, 10) || 0
    var count = 5
    var index = page * count
    var q = req.query.q //拿到容器搜索请求

    if(q){
        //admin搜索所有用户容器
        Container.find({hostname: new RegExp(q + '.*', 'i')})
            .populate({path: 'user'})
            .sort('meta.updateAt')
            .exec(function(err, containers) {
                if(err) console.log(err)
                var results = containers.slice(index, index + count)
                User.fetch(function(err, users){
                    if(err) console.log(err)
                    res.render('adminconindex',{

                        //渲染用户列表
                        title: '管理面板',
                        auser: users,

                        //分页渲染containers列表
                        currentPage: (page + 1),
                        query: 'user=' + userId,
                        totalPage: Math.ceil(containers.length / count),
                        acontainers: results
                    })
                })
            })
    }else{
        //分页列出admin容器列表
        Container.find({})
            .populate({path: 'user'})
            .sort('meta.updateAt')
            .exec(function(err, containers){
                if(err) console.log(err)

                //containers分页数据
                var results = containers.slice(index, index + count) || []

                //单独取出所有用户和上没关系
                User.fetch(function(err, users){
                    if(err) console.log(err)
                    res.render('adminconindex',{

                        //渲染用户列表
                        title: '管理面板',
                        auser: users,

                        //分页渲染containers列表
                        currentPage: (page + 1),
                        query: 'user=' + userId,
                        totalPage: Math.ceil(containers.length / count),
                        acontainers: results
                    })
                })
            })
    }
}

