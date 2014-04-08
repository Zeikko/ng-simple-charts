'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        jshint: {
            all: {
                src: ['gruntfile.js', 'directives/*.js', 'simple-charts.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            production: {
                files: {
                    'ng-simple-charts.min.js': [
                        'src/simple-charts.js',
                        'src/directives/*.js'
                    ]
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: ['assets/css/*.css']
            }
        },
        cssmin: {
            combine: {
                files: {
                    'ng-simple-charts.min.css': [
                        'src/assets/css/*.css'
                    ]
                }
            }
        },
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);


    //Build task.
    grunt.registerTask('build', ['jshint', 'csslint', 'cssmin', 'uglify']);
};
