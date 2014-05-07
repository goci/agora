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
      lib_javascripts: {
        files: ['lib/assets/js/**/*.js'],
        tasks: ['uglify:lib_javascripts'],
        options: {
          nospawn: true
        }
      },
      vendor_javascripts: {
        files: ['lib/assets/vendor/**/*.js'],
        tasks: ['uglify:vendor_javascripts'],
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

    uglify: {
      options: {
        mangle: false
      },

      vendor_javascripts: {
        files: {
          'public/assets/vendor.js': ['lib/assets/vendor/js/foundation/vendor/jquery.js', 'lib/assets/vendor/**/*.js'],
        }
      },

      lib_javascripts: {
        files: {
          'public/assets/lib.js': ['lib/assets/js/**/*.js']
        }
      }
    },

    protractor: {
      options: {
        configFile: "node_modules/grunt-protractor-runner/node_modules/protractor/referenceConf.js",
        keepAlive: true,
        noColor: false,
        chromeDriver: '/opt/google/chrome',
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
        browsers: ['ChromeNoSandbox']
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['concat', 'uglify']);

  grunt.registerTask('test_functional', ['protractor:test']);
  grunt.registerTask('test_unit', ['karma:unit']);

  grunt.registerTask('deploy', ['concat', 'exec:deploy']);
};
