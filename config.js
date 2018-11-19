const IS_DEV = process.env.NODE_ENV !== 'production'

exports.BASE_URL = IS_DEV
  ? 'http://localhost:9982/api/'
  : 'http://47.106.14.128:9982/api'
