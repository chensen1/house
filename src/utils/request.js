import axios from 'axios'

// create an axios instance
let service = null
window._axiosPromiseArr = []
service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000 // request timeout
})
// 添加请求拦截器
service.interceptors.request.use((config) => {
  // console.log(config)
  config.cancelToken = new axios.CancelToken(cancel => {
    window._axiosPromiseArr.push({ cancel })
  })
  return config
}, (error) => {
  return Promise.resolve(error)
})
// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // const headers = response.headers
    if (response.status === 200) {
      return response
    } else {
      message.error(response)
      return Promise.reject(response)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 返回axios请求实例
const request = (params) => {
  return new Promise((resolve, reject) => {
    service(params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default request
