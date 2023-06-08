import axios from 'axios'
import { parseCookies } from 'nookies'

const token = parseCookies('token')

export const http = axios.create({
  baseURL: '/'
})

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
