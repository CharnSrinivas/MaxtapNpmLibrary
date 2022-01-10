
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./package_name.cjs.production.min.js')
} else {
  module.exports = require('./package_name.cjs.development.js')
}
