module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      styles: {
        files: ['sass/**/*.scss'],
        tasks: ['compass:dev'],
        options: {
          spawn: false
        }
      },
   },

    compass: {
      dev: {
        options: {
          sassDir: 'sass',
          specify: 'sass/custom.scss',
          cssDir: 'css'
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['watch:styles'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

 });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concurrent');


  // tasks
  grunt.registerTask('develop', ['compass:dev', 'concurrent:dev']);
  grunt.registerTask('default', 'develop');
};