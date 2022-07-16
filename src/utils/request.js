import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
  // timeout: 3000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // console.log(config)
    const token = store.state.user.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)
export default request
