module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      html: {
        files: {
          'public/index.html': ['lib/html/index.html']
        },
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
          'public/assets/vendor.js': ['lib/assets/vendor/js/foundation/vendor/jquery.js', 'lib/assets/vendor/**/*.js'],
          'public/assets/lib.js': ['lib/assets/js/**/*.js']
        }
      }
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['concat'],
        options: {
          nospawn: true
        }
      },
      html: {
        files: ['lib/html/**/*.html'],
        tasks: ['concat:html'],
        options: {
          nospawn: true
        }
      },
      styles: {
        files: ['lib/assets/css/**/*.css'],
        tasks: ['concat:css'],
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
        args: {
          params: ['no-sandbox']
        }
      },
      test: {
        options: {
          configFile: "e2e.conf.js",
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browser: ['chrome'],
        capabilities: {
          browserName: 'chrome',
            chromeOptions: {
            binary: '/opt/google/chrome',
            args: ['no-sandbox']
          }
        }
      }
    },

    exec: {
      deploy: {
        command: 'parse deploy'
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['concat']);

  grunt.registerTask('test_functional', ['protractor:test']);
  grunt.registerTask('test_unit', ['karma:unit']);

  grunt.registerTask('deploy', ['concat', 'exec:deploy']);
};
