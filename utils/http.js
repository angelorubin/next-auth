import axios from 'axios'
import { parseCookies } from 'nookies'

export const http = axios.create({
  baseURL: '/'
})

const token = parseCookies('token')

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
