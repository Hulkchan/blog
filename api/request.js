import axios from 'axios'
import * as config from '../config.js'
import qs from 'qs'

const fetch = axios.create({
  baseURL: config.BASE_URL
})

// 请求拦截器
fetch.interceptors.request.use(
  config => {
    const method = config.method.toLocaleLowerCase()
    const methods = ['post', 'put', 'delete', 'patch']
    const hasMethod = methods.some(item => {
      return item === method
    })
    config.data = hasMethod ? qs.stringify(config.data) : config.data
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
fetch.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default fetch
