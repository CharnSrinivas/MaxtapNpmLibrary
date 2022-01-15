const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('rollup-plugin-replace');
module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: true,
        // only write out CSS for the first bundle (avoids pointless extra files):
      })
    );
    config.plugins.push(
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify('production'),
        preventAssignment: true,
      })
    );
    
    return config;
  },
};
