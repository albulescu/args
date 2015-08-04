'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            source: [
                'index.js'
            ],
        },

        nodeunit: {
            all: ['tests.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('build', ['jshint', 'nodeunit']);
    grunt.registerTask('default', ['build']);
};