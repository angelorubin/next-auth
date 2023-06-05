import axios from 'axios'
import { parseCookies } from 'nookies'

export const http = axios.create({
  baseURL: 'https://vercel.com/angelorubin/next-auth'
})

const token = parseCookies('token')

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
