import axios from 'axios'
import { parseCookies } from 'nookies'

const token = parseCookies('token')

export const api = axios.create({
  baseURL: 'https://next-auth-angelorubin.vercel.app/api'
})

api.defaults.headers.common['Authorization'] = `Bearer ${token}`
