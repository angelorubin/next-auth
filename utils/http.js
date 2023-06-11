import axios from 'axios'
import { parseCookies } from 'nookies'

const token = parseCookies('token')

export const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}/`
})

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
