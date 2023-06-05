import axios from 'axios'
import { parseCookies } from 'nookies'

export const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const token = parseCookies('token')

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
