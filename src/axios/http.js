import axios from 'axios'
// axios 配置
const http = axios.create({
  // 设置请求根目录
  baseURL: process.env.NODE_ENV == 'production' ? api.baseURL : 'http://localhost:8000',
  // 设置请求超时时间
  timeout: 100000
})

export default http
