var Child_process = require('child_process')


// 容器操作类
exports.dkconExec = function(conid, options){

    //创建
    this.created = function(options, callback){
        var exec = Child_process.exec
        var commandLine = 'curl -X POST -H "Content-Type: application/json" http://localhost:2376/containers/create -d ' + '\'' + JSON.stringify(options) + '\''
        exec(commandLine,function(err,stdout,stderr){
            if(err) console.log('child process exited with error code', err.code)
            console.log('container created' + stdout)
            callback (stdout)
        })
    }

    //启动
    this.started = function(conid, callback){
        var exec = Child_process.exec
        var commandLine = 'curl -X POST http://localhost:2376/containers/' + conid + '/start'
        exec(commandLine,function(err,stdout,stderr){
            if(err) console.log('child process exited with error code', err.code)
            console.log('container started' + stdout)
            callback (stdout)
        })
    }

    //停止
    this.stopped = function(conid, callback){
        var exec = Child_process.exec
        var commandLine = 'curl -X POST http://localhost:2376/containers/' + conid + '/stop'
        exec(commandLine,function(err,stdout,stderr){
            if(err) console.log('child process exited with error code', err.code)
            console.log('container stopped' + stdout)
            callback (stdout)
        })
    }

    //删除
    this.deleted = function(conid, callback){
        var exec = Child_process.exec
        var deleteCmd = 'curl -X DELETE http://localhost:2376/containers/' + conid
        exec(deleteCmd, function(err, stdout, stderr){
            if(err) console.log('child process exited with error code', err.code)
            console.log('container deleted' + stdout)
            callback(stdout)
        })
    }

}


// 镜像操作

