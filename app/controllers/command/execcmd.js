var Child_process = require('child_process')

//利用子进程获取命令结果String
exports.getCommandData = function(commandLine, callback){
    var exec = Child_process.exec
    exec(commandLine, function(err, stdout, stderr){
        if(err) console.log('child process exited with error code', err.code)
        callback(stdout)
    })
}

//调用getCommanData获取dockerm.sh结果
exports.getAllData = function(callback){
    var systemCommand = 'dockerm.sh'
    this.getCommandData(systemCommand,function(stdout){
        var allDataStr = stdout
        //console.log(allDataStr)
        var allDataObj = JSON.parse(allDataStr)
        //console.log(allDataObj)
        callback(allDataObj)
    })
}

