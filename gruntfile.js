module.exports = function(grunt) {

    grunt.initConfig({  //任务依赖的配置数据
        watch: {
            jade: {
                files: ['views/**'],    //监听文件
                options: {
                    livereload: true  //当文件改动时会重新启动服务
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jshint'],  //语法检查
                options: {
                    livereload: true
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['public/libs/**/*.js']
            },
            all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
        },

        nodemon: {
            dev: {  //开发环境
                script: 'app.js',  //Script that nodemon runs and restarts when changes are detected.
                options: {
                    //file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 5000
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {   //可以重新执行nodemon和watch任务
            tasks: ['nodemon', 'watch', 'jshint'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')  //监视文件变动后，自动执行注册任务
    grunt.loadNpmTasks('grunt-nodemon')  //入口文件app.js重启时，会自动重启它
    grunt.loadNpmTasks('grunt-concurrent')  //优化慢任务，如sass等
    grunt.loadNpmTasks('grunt-contrib-jshint');//用于检测文件格式、语法等问题模块

    grunt.option('force', true)   //减少grunt错误或警告中断服务的次数
    grunt.registerTask('default', ['concurrent'])   //注册默认任务concurrent

}