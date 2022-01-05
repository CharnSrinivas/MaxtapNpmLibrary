
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./maxtap_public.cjs.production.min.js')
} else {
  module.exports = require('./maxtap_public.cjs.development.js')
}
