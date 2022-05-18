import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: 'http://nad.bdhuoke.com/business_admin',
  timeout: 10000,
  headers: { "Content-Type": 'application/x-www-form-urlencoded' }
})
service.interceptors.request.use(
  config => {
    config.headers['token'] = localStorage.getItem('token')
    return config
  },
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
)

export default service
