import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const plugins = [
  alias({
    vue$: './dist/vue.common.js'
  }),
  vue({
    css: './dist/styles.css',
    compileTemplate: true,
  }),
  buble({}),
  nodeResolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(),
  nodeGlobals()
]

const config = {
  entry: './dist/bundle.js',
  dest: './dist/_bundle.js',
  sourceMap: true,
  plugins: plugins
}

const isDevelopment = process.env.NODE_ENV === `development`

if (isDevelopment) {
  config.plugins.push(livereload())
  config.plugins.push(serve({
    contentBase: './dist/',
    port: 8080,
    open: true
  }))
}

export default config
