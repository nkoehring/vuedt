import path from 'path'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import filesize from 'rollup-plugin-filesize'

export default {
  input: './src/VueDT.vue',
  output: [
    { file: pkg.browser, format: 'umd', name: pkg.name, plugins: [terser()] },
    { file: pkg.main, name: pkg.name, format: 'umd' },
    { file: pkg.module, format: 'esm' }
  ],
  external: ['vue'],
  plugins: [
    babel(),
    nodeResolve({ mainFields: ['module', 'main'] }),
    postcss({ extract: path.resolve('./dist/vuedt.css'), minimize: { preset: 'advanced' }}),
    vue({ css: false }),
    analyze(),
    filesize({ showBrotliSize: true }),
  ]
}
