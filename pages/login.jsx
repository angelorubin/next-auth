import Link from 'next/link'
import styles from '../styles/Login.module.css'
import { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

import LoginCard from '@/src/components/loginCard/LoginCard'
import Input from '@/src/components/input/Input'
import Button from '@/src/components/input/button/Button'

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const handleFormEdit = (event, name) => {
    setFormData({ ...formData, [name]: event.target.value })
  }

  const handleForm = async (event) => {
    try {
      event.preventDefault()
      const response = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      const json = await response.json()
      if (response.status !== 200) throw new Error(json)
      setCookie('authorization', json)
      router.push('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Entre em sua conta">
        <form onSubmit={handleForm} className={styles.form}>
          <Input
            type="email"
            placeholder="Seu e-mail"
            required
            value={formData.email}
            onChange={(e) => {
              handleFormEdit(e, 'email')
            }}
          />
          <Input
            type="password"
            placeholder="Sua senha"
            required
            value={formData.password}
            onChange={(e) => {
              handleFormEdit(e, 'password')
            }}
          />
          <Button>Entrar</Button>
          {error && <p className={styles.error}>{error}</p>}
          <Link href="/cadastro">Ainda não possui conta?</Link>
        </form>
      </LoginCard>
    </div>
  )
}
