import axios from 'axios'

const REACT_APP_BASE_API = 'http://127.0.0.1:5000'

const request = axios.create({
  // 请求的base_url
  baseURL: REACT_APP_BASE_API,
  // 超时时间 
  timeout: 5000
})

request.interceptors.request.use(
  function (req) {
    return req
  },
  function (err) {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  function (response){
    return response.data
  }, 
  function(err) {
    return Promise.reject(err)
  }
)
export default request