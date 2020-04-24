// Libs
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import gzip from 'rollup-plugin-gzip';
import nodeResolve from 'rollup-plugin-node-resolve';
import path from 'path';
import { uglify } from 'rollup-plugin-uglify';

// Read package config
const pkgConfig = require('./package.json');

// Constants
const DIST = process.env.DIST || false;
const MIN = process.env.MIN || false;

const banner = `/**
* https://github.com/yszhao91/xtorcga
*CGA Lib |xtorcga |alex Zhao | Zhao yaosheng
*@license free for all
*/`;

const plugins = [
    babel({
        exclude: 'node_modules/**'
    }),
    nodeResolve({
        browser: true
    }),
    commonjs({
        sourceMap: false,
        // namedExports: {
        //     'node_modules/eventemitter2/lib/eventemitter2.js': ['EventEmitter2']
        // }
    })
];

if (MIN)
{
    plugins.push(uglify({
        output: {
            comments: /@license/
        }
    }));
    plugins.push(gzip());
}

export default {
    input: path.join('src', 'index.js'),
    external: ['lodash'],
    plugins: plugins,
    output: {
        file: path.join(DIST ? 'dist' : 'build', 'robot' + (MIN ? '.min' : '') + '.js'),
        format: 'iife',
        // format: 'umd',
        name: 'robot',
        banner: banner,
        globals: {
            lodash: '_'
        }
    }
};