import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    typescript(),
    resolve(),
    commonjs()
  ]
}; 