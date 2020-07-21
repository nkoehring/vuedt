import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import replace from 'rollup-plugin-replace'

export default {
  input: './src/main.js',
  output: { file: 'dist/devbundle.js', format: 'iife' },
  plugins: [
    babel(),
    nodeResolve({ mainFields: ['module', 'main'] }),
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV
    }),
    vue(),
    htmlTemplate({
      template: 'public/index.html',
      target: 'dist/index.html'
    })
  ]
}
