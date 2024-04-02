const sass = require('node-sass');

module.exports = function (grunt) {
  'use strict';
  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= props.license %> */\n',
    // Task configuration

    sass: {
      options: {
        implementation: sass,
        sourceMap: false,
        outputStyle: 'expanded',
      },
      dist: {
        files: [{
            expand: true,
            flatten: true,
            src: 'styles/components/*.sass',
            dest: 'dist/components/',
            ext: '.css',
          },
          {
            expand: true,
            flatten: true,
            src: 'styles/layouts/*.sass',
            dest: 'dist/layouts/',
            ext: '.css',
          },
          {
            expand: true,
            flatten: true,
            src: 'styles/*.sass',
            dest: 'dist/',
            ext: '.css',
          },
          {
            expand: true,
            src: 'styles/themes/**/*.sass',
            dest: 'dist/themes',
            ext: '.css',
          }
        ],
      },
    },
    sasslint: {
      options: {
        configFile: 'sass-lint.yml',
      },
      target: ['styles/**/*.sass', 'styles/**/*.scss']
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer'),
          require('postcss-prefixer')({
            prefix: 'sap-crm-'
          }),
          // require('cssnano')({
          //   preset: ['default', {
          //       discardComments: {
          //           removeAll: true,
          //       },
          //   }]
          // }),
        ]
      },
      dist: {
        src: 'dist/**/*.css'
      }
    },
    watch: {
      css: {
        files: ['styles/**/*.sass', 'styles/**/*.scss'],
        tasks: ['sasslint', 'sass', 'postcss'],
      }
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-postcss');

  // Default task
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['sasslint', 'sass', 'postcss']);
};
