import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Accept'] = 'application/json'
    config.headers['Authorization'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    if (error.response) {
      if (error.response.status === 422) {
        let errorHtml = ''
        for (const oneError in error.response.data) {
          error.response.data[oneError].forEach(function(vv, kk) {
            const tmp = '<p>' + vv + '</p>'
            errorHtml += tmp
          })
        }
        MessageBox.alert(errorHtml, 'Error Message', {
          dangerouslyUseHTMLString: true
        })
      } else {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return Promise.reject(error)
  }
)
export default service
