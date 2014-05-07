module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: ['lib/html/index.html'],
        dest: 'public/index.html'
      },
      css: {
        options: {
          separator: ';',
        },
        files: {
          'public/assets/vendor.css': ['lib/assets/vendor/css/**/*.css'],
          'public/assets/lib.css': ['lib/assets/css/**/*.css']
        }
      },
      js: {
        options: {
          separator: ';',
        },
        files: {
          'public/assets/vendor.js': ['lib/assets/vendor/js/**/*.js'],
          'public/assets/lib.js': ['lib/assets/js/**/*.js']
        }
      }
    },

    watch: {
      styles: {
        files: ['lib/assets/css/**/*.css'],
        tasks: ['less', 'concat:css'],
        options: {
          nospawn: true
        }
      },
      javascripts: {
        files: ['lib/assets/**/*.js'],
        tasks: ['concat:js'],
        options: {
          nospawn: true
        }
      },
      html: {
        files: ['lib/html/**/*.html'],
        tasks: ['concat:dist'],
        options: {
          nospawn: true
        }
      }
    },

    protractor: {
      options: {
        configFile: "node_modules/grunt-protractor-runner/node_modules/protractor/referenceConf.js",
        keepAlive: true,
        noColor: false,
      },
      test: {
        options: {
          configFile: "e2e.conf.js",
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('default', ['concat']);
  grunt.registerTask('test_functional', ['protractor:test']);
};
