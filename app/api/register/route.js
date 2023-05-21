import { NextResponse, NextRequest } from 'next/server'
import { userRetrieve } from './service'

export async function GET(req, res) {
  // const user = await userRetrieve(req.body.email)
  return res.json({ message: 'test' })
}
