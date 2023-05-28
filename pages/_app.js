// pages/_app.js
import { useEffect } from 'react'
import connectDB from '../utils/database'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    connectDB()
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
