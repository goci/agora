module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['lib/html/index.html'],
        dest: 'public/index.html'
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};
