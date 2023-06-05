import axios from 'axios'
import { parseCookies } from 'nookies'

const token = parseCookies('token')

export const api = axios.create({
  baseURL: 'https://vercel.com/angelorubin/next-auth/api'
})

api.defaults.headers.common['Authorization'] = `Bearer ${token}`
