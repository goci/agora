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
          'public/assets/vendor.js': ['lib/assets/vendor/js/*.js', 'lib/assets/vendor/**/*.js'],
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat']);
};
