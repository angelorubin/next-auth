import axios from 'axios'
import { parseCookies } from 'nookies'

const token = parseCookies('token')

export const api = axios.create({
  baseURL: window.location.origin
})

api.defaults.headers.common['Authorization'] = `Bearer ${token}`
