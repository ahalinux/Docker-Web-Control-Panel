#!/bin/bash
# 此脚本需ln -f到/usr/local/bin目录下

# 获取系统信息函数
function getcmd {
    osName=\"osName\":\"$(cat /etc/issue|grep -e "Ubuntu"|awk '{printf $1 " " $2 " " $3 "\n"}')\"
    networkStatus=\"networkStatus\":\"$(ping -c 1 127.0.0.1 &>/dev/null && echo "Internet: Connected" || echo "Internet: Disconnected")\"
    memStatus=\"memStatus\":\"$(printf "%.2f\n" `awk '/MemTotal/{total=$2}/MemFree/{free=$2}END{print (total-free)/1024/1024}' /proc/meminfo`)\"
    loadAverage=\"loadAverage\":\"$(top -n 1 -b|grep "load average:"|awk '{print $12 $13 $14}')\"
    diskAverge=\"diskAverge\":\"$(df -hP|grep /dev/sda1|awk '{print $1 " : " $5}')\"
    return 20
}

getcmd
getcmdstr="{"$osName\,$networkStatus\,$memStatus\,$loadAverage\,$diskAverge\,

# 获取Docker信息函数
function getdockerinfo {
    dockerVer=\"dockerVer\":\"$(docker -v |awk '{printf $3  "\n"}' |cut -d "," -f 1)\"
    dockerImg=\"dockerImg\":\"$(docker images |grep -vE 'REPOSITORY|none' |wc -l)\"
    dockerCon=\"dockerCon\":\"$(docker ps |grep -vE 'CONTAINER' |wc -l)\"
    dockernCon=\"dockernCon\":\"$(docker ps -a |grep -vE 'CONTAINER' |wc -l)\"
    dockerFs=\"dockerFs\":\"$(docker info 2>/dev/null |grep "Filesystem" |awk '{print $3}')\"
    kenVer=\"kenVer\":\"$(uname -r |awk 'BEGIN{FS="-"} {printf $1 "\n"}')\"
    return 21
}

getdockerinfo
getdockerinfostr=$dockerVer\,$dockerImg\,$dockerCon\,$dockernCon\,$dockerFs\,$kenVer"}"


# 拼接函数输出为json字符串
echo $getcmdstr$getdockerinfostr

