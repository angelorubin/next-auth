import axios from 'axios'
import { parseCookies } from 'nookies'

export const http = axios.create({
  baseURL: 'localhost:3000/api'
})

const token = parseCookies('token')

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
