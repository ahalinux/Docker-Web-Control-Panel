var User = require('../models/user')
var Usercat = require('../models/usercat')

// signup
exports.showSignup = function(req, res) {
    res.render('signup', {
        title: '注册页面'
    })
}

// signin
exports.showSignin = function(req, res) {
    res.render('signin', {
        title: '登录页面'
    })
}


exports.signup = function(req,res){
    var _user = req.body.user
    User.findOne({name: _user.name},function(err,user){
        if(err) console.log(err)
        if(user){
            return res.redirect('/signin')
        }else{
            var user = new User(_user)
            user.save(function(err, user){
                if(err) console.log(err)

                // 同时见user._id存入到usercat中
                _Usercat = new Usercat({
                    name: user._id
                })

                _Usercat.save(function(err, usercat){
                    if(err) console.log(err)
                    res.redirect('/')
                })
            })
        }
    })
}

exports.signin = function(req,res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password

    User.findOne({name: name},function(err,user){
        if(err) console.log(err)

        //用户名不存在则掉转到注册
        if(!user){
            return res.redirect('/signup')
        }else{
            //用户状态status为0则，正常登录
            //console.log(user.status)
            if(user.status == 0){
                user.comparePassword(password,function(err,isMatch){
                    if(err) console.log(err)
                    if(isMatch){
                        req.session.user = user
                        if(req.session.user.name == 'admin'){
                            return res.redirect('/admin/super/superconindex?user='+user._id+'&p=0')
                        }else{
                            return res.redirect('/admin/user/userconindex?user='+user._id+'&p=0')
                        }
                    }else{
                        return res.redirect('/signin')
                        console.log('Password is not match')
                    }
                })
            }else{
                return res.redirect('/signin')
                console.log('Users disables logging')
            }
        }
    })
}

exports.userlist = function(req,res){
    User.fetch(function(err,users){
        if(err) console.log(err)
        res.render('userlist',{
            title: '用户列表页',
            users: users
        })
    })
}

exports.deluser = function(req,res){
    var id = req.query.id
    if(id){
        User.remove({_id: id},function(err,user){
            if(err) console.log(err)
            res.json({success: 1})
        })
    }
}


exports.stopuser = function(req, res){
    var id = req.query.id
    if(id){
        User.findOne({_id: id})
            .exec(function(err, user){
                if(err) console.log(err)

                //如果为管理员则禁止停用
                if(user.name == 'admin'){
                    return
                }else{
                    //如果为普通用户则可以停用
                    User.findByIdAndUpdate(id, {status: 1}, function(err, status){
                        if(err) console.log(err)
                        //console.log(status)
                        res.json({success: 1})
                    })
                }
            })
    }
}

exports.startuser = function(req, res){
    var id = req.query.id
    if(id){
        User.findOne({_id: id})
            .exec(function(err, user){
                if(err) console.log(err)

                if(user.name == 'admin'){
                    return
                }else{
                    User.findByIdAndUpdate(id, {status: 0}, function(err, status){
                        if(err) console.log(err)
                        //console.log(status)
                        res.json({success: 1})
                    })
                }
            })
    }
}


exports.logout = function(req,res){
    delete req.session.user
    res.redirect('/')
}


// midware for user
exports.signinRequired = function(req,res,next){
    var user = req.session.user

    if(!user){
        return res.redirect('/signin')
    }

    next()
}

exports.adminRequired = function(req,res,next){
    var user = req.session.user

    if(user.role <= 10){
        return res.redirect('/signin')
    }

    next()
}

