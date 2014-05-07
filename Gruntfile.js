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
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat']);
};
