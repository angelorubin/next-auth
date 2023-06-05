import axios from 'axios'
import { parseCookies } from 'nookies'

const token = parseCookies('token')

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

api.defaults.headers.common['Authorization'] = `Bearer ${token}`
