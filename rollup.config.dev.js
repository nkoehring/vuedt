import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/main.js',
  output: {
    name: 'sample',
    file: pkg.browser,
    format: 'umd',
    plugins: [
      babel(),
      nodeResolve({ mainFields: ['module', 'main'] }),
      vue(),
      serve()
    ]
  }
}
