# Docker Web Control Panel

## 运行环境 ##
  建议运行在Ubuntu 14.04 Server下，Node版本不低于0.12.10，Docker版本1.9.1以上。

## 配置说明  ##
1. 在Clone项目后，将主目录下package.json文件的"version"字段中，添加"private": true, 注意结尾的逗号。

2. 在命令函运行npm install进行modules安装

3. 将./app/controllers/command/dockerm.sh的Bash脚本文件，硬链接到系统/usr/local/bin/下，如有跨文件系统问题，也可复制运行。

4. 开启Docker Remote API，编辑/etc/default/docker，加入：DOCKER_OPTS="-H 0.0.0.0:2376 -H unix:///var/run/docker.sock"

5. 运行程序node app.js

## 初次使用 ##
1. 系统运行后，请先注册admin用户并赋予管理权限，如：db.users.update({"_id" : ObjectId("admin的ID字符串")},{$set: {role: 51}})

2. 如需调试，请重新安装npm install grunt -g 及 npm install grunt-cli -g

3. Good Lucky ~ :)
