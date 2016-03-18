var User = require('../models/user')
var Usercat = require('../models/usercat')
var Container = require('../models/container')
var Dockercontroll = require('./dockercontroll')


// 从表单创建并启动容器
exports.createusercon = function(req,res){
    var containerObj = req.body.createcon
    var userId = req.session.user._id
    var conid = ''
    var options =
    {
        "Image" : containerObj.image,
        "Hostname" : containerObj.hostname,
        //"Cmd" : ["system3"]
    }

    //判断usercat内container数量，大于7则终止执行
    Usercat.findOne({name: userId}).exec(function(err, usercat){
        if(err) console.log(err)

        if(usercat.containers.length < 5){
            //console.log(usercat.containers.length)

            //调用con创建模块
            var dkconexec = new Dockercontroll.dkconExec(conid, options)
            dkconexec.created(options,function(stdout){
                _Container = new Container({
                    image: containerObj.image,
                    hostname: containerObj.hostname,
                    id: JSON.parse(stdout).Id,
                    warnings: [JSON.parse(stdout).Warnings],
                    user: userId
                })

                //存入container
                _Container.save(function(err, container){
                    if(err) console.log(err)

                    //存入usercat
                    Usercat.findOne({name: userId},function(err, usercat){
                        if(err) console.log(err)
                        usercat.containers.push(container._id)
                        usercat.save(function(err, usercat){
                            if(err) console.log(err)

                            //调用启动模块
                            var conid = container.id
                            dkconexec.started(conid,function(stdout){
                                res.redirect('/admin/user/userconindex')
                            })
                        })
                    })
                })
            })
        }else{
            res.redirect('/admin/user/userconindex')
            //return
        }
    })
}


// 从表单停止容器
exports.stopusercon = function(req,res){
    var conid = req.query.id
    if(conid){
        var dkconexec = new Dockercontroll.dkconExec(conid)
        dkconexec.stopped(conid,function(stdout){
            res.json({success: 1})
        })
    }
}


// 从表单删除容器
exports.delusercon = function(req,res){ //应先停止再删除
    var conid = req.query.id
    //console.log(id)
    if(conid){
        Container.findOne({id: conid}, function(err,container){
            if(err) console.log(err)

            //删除usercat数据
            if(container){
                Usercat.findOne({containers: container._id},function(err, usercat){
                    //console.log(usercat)
                    var usercatindex = usercat.containers.indexOf(container._id)
                    usercat.containers.splice(usercatindex,1)
                    usercat.save(function(err, usercat){
                        if(err) console.log(err)

                        //删除Container表数据
                        Container.remove({id: conid},function(err, container){
                            if(err) console.log(err)

                            //用子进程停止容器
                            var dkconexec = new Dockercontroll.dkconExec(conid)
                            dkconexec.stopped(conid,function(stdout){

                                //用子进程删除容器
                                var dkconexec = new Dockercontroll.dkconExec(conid)
                                dkconexec.deleted(conid,function(stdout){
                                    res.json({success: 1})
                                })
                            })
                        })
                    })
                })
            }else{
                //console.log(res)
                return res.redirect('/admin/user/userconindex')
            }
        })
    }
}