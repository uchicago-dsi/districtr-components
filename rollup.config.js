import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'

const packageJson = require('./package.json')

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  external: ['styled-components'],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true
    }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
    copy({
      targets: [
        {
          src: 'src/index.css',
          dest: 'build',
          rename: 'districtr-mapbox-gl.css'
        }
      ]
    })
  ]
}
