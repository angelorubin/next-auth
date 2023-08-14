import { userCreate, usersRetrieve, userRetrieveById } from './service'

import { NextResponse } from 'next/server'

export async function GET() {}

export async function POST() {}

/**
 * export default async function handler(req, res) {
  const { query, params } = req

  if (req.method === 'POST') {
    const { body: userData } = req
    const createdUser = await userCreate(userData)
    return res.json({ ...createdUser })
  }

  if (req.method === 'GET' && query.id) {
    const id = query.id
    const user = await userRetrieveById(id)
    res.json({ user })
  }

  if (req.method === 'GET') {
    const users = await usersRetrieve()
    res.json({ ...users })
  }
  res.status(404).json({ error: 'Rota não encontrada' })
}
 */
