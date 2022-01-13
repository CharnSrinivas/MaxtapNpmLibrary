
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./maxtap_plugin.cjs.production.min.js')
} else {
  module.exports = require('./maxtap_plugin.cjs.development.js')
}
