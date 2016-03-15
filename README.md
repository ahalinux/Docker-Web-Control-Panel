# Dcoker Web Control Panel

## 初次使用 ##
1. 建议运行在Ubuntu14.04 Server下，Node版本0.12.10，Docker版本1.9.1以上。

2. Clone项目后在package.json的"version"字段下，添加"private": true，注意结尾的逗号。

3. 运行npm install

4. 将脚本./app/controllers/command/dockerm.sh文件，硬链接到系统/usr/local/bin/下
  如：ln (-f) dockerm.sh /usr/local/bin/

5. 打开Docker Remote API，
  如：sudo vim /etc/default/docker
  增加：DOCKER_OPTS="-H 0.0.0.0:2376 -H unix:///var/run/docker.sock"

6. 运行程序node app.js

7. 初次进入系统，需先注册admin管理用户，并赋予其管理权限，
  如：db.users.update({"_id" : ObjectId("...")},{$set: {role: 51}})

8. 如需调试，请重新安装npm install grunt -g 及 npm install grunt-cli -g

9. Good Lucky ~ :)
