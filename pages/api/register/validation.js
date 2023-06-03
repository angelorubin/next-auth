import { z } from 'zod'

export const schemaValidation = z.object({
  name: z.string(),
  email: z.string().email('O campo email deve ser um email válido'),
  password: z.string()
})
