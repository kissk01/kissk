module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    vue: {
        options: {
            quoteChar: "'",
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            },
            indentString: '  ',
            process: false,
            separator: grunt.util.linefeed
        },

        // compile all found in src directory
        task1: {
            dest: '/src/compiled-script.js',
            src: [
              'src/components',
              'src/router',
              'src/App.vue',
              'src/main.js'
            ]
        }

        // compile specific js found in src directory
        /*task2: {
            dest: '/path/to/compiled-script.js',
            src: '/path/to/source/dir',
            includeOnly: {
                components: ['component1', 'component2'],
                directives: ['directive1', 'directive2'],
                mixins: 'all'
            }
        },*/

        // compile all except few specific js files
        /*task3: {
            dest: '/path/to/compiled-script.js',
            src: '/path/to/source/dir',
            exclude: {
                components: ['component3', 'component4'],
                directives: ['diretive3', 'directive4'],
                transitions: 'all'
            }
        }*/
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-vue');

  grunt.registerTask('default', ['vue']);
};
