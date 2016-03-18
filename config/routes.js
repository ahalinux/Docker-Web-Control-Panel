var Index = require('../app/controllers/index')
var Container = require('../app/controllers/container')
var User = require('../app/controllers/user')

module.exports = function(app){

    // pre handle user
    app.use(function(req,res,next){
        var _user = req.session.user
        app.locals.user = _user
        next()
    })

    // Index
    app.get('/', Index.index)
    app.get('/admin/user/userconindex', User.signinRequired, Index.userconindex)
    app.get('/admin/super/superconindex', User.signinRequired, User.adminRequired, Index.superconindex)



    // Container(user index)
    app.post('/admin/user/concreate', User.signinRequired, Container.createusercon)
    app.get('/admin/user/constop', User.signinRequired, Container.stopusercon)
    app.delete('/admin/user/condel', User.signinRequired, Container.delusercon)


    // Container(admin index)
    //app.get('/super/viewer', User.signinRequired, User.adminRequired, Container.admincon)


    // User
    app.get('/signin', User.showSignin)
    app.get('/signup', User.showSignup)
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.userlist)
    app.get('/logout', User.logout)
    app.delete('/admin/user/list', User.signinRequired, User.adminRequired, User.deluser)
    app.get('/admin/user/stopped', User.signinRequired, User.adminRequired, User.stopuser)
    app.get('/admin/user/started', User.signinRequired, User.adminRequired, User.startuser)
}