module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        background: true,
        singleRun: false
      },
      dist: {
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      uses_defaults: ['js/**/*.js', 'test/**/*.js'] 
    },
    wiredep : {
      dev: {
        src: 'karma.conf.js',
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },
    uglify: {
      dist: {        
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: {
         'dist/mouseheld.js' : ['js/**/*.js']
        }
      },
      distMin: {        
        options: {
          mangle: false,
          compress: true,
          beautify: false
        },
        files: {
         'dist/mouseheld.min.js' : ['js/**/*.js']
        }
      }
    },
    clean: {
      dist : ['dist'] 
    },
    watch: {
      startup: {
        files: [],
        tasks: ['karma:unit:start'],
        options: {
            atBegin: true,
            spawn: false
        }
      },
      karma: {
        files: ['js/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'karma:unit:run']
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jshint', 'karma:dist']);
  grunt.registerTask('dist', ['clean', 'uglify']);
  grunt.registerTask('build', ['test', 'dist']);
  grunt.registerTask('default', ['build']);

};
