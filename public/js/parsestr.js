
exports.parseslash = function(str){
    var str = str.replace(/[\/]/g,'')
    return (str)
}

exports.parsedockerstatus = function(str){
    var retStatus = str.split(" ")[0]
    switch(retStatus){
        case 'Up':
            return ('已启动')
            break
        case 'Created':
            return ('已创建')
        case 'Exited':
            return ('已停止')
        default :
            return ('未知状态')
    }
}

exports.parseuserrole = function(str){
    var retStatus = str
    switch(retStatus){
        case 0:
            return ('用户')
            break
        case 51:
            return ('管理员')
        default :
            return ('您是哪位')
    }
}

exports.parseuserstatus = function(str){
    var retStatus = str
    switch(retStatus){
        case 0:
            return ('正常')
            break
        case 1:
            return ('已停用')
        default :
            return ('啥情况')
    }
}
