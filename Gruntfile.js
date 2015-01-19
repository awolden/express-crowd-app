'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            client: {
                files: ['client/*', 'client/**/*'],
                tasks: ['browserify:development'],
                options: {
                    spawn: false,
                }
            }
        },
        browserify: {
            development: {
                files: {
                    './public/js/app.js': ['./client/index.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default task(s).
    grunt.registerTask('default', ['browserify:development', "watch:client"]);

};