import Link from 'next/link'
import styles from '../../styles/Auth.module.css'
import axios from 'axios'

import { useState } from 'react'
import { useRouter } from 'next/router'

import LoginCard from '../../src/components/login-card'
import Input from '../../src/components/input'
import Button from '../../src/components/button'

export default function Auth() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({ status: false, message: '' })

  const handleFormEdit = (event, name) => {
    setFormData({ ...formData, [name]: event.target.value })
  }

  const handleForm = async (event) => {
    event.preventDefault()
    const res = await axios.post('/api/auth', { ...formData })
    console.log(res.data)

    try {
      if (res.data.token) {
        // Requisição bem-sucedida
        console.log('Requisição POST realizada com sucesso')
        router.push('/dashboard')
      } else {
        // Tratar erros de resposta
        setError({ status: true, message: res.data.message })
      }
    } catch (err) {
      setError({ status: true, message: err.message })
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
          {error.status && <p className={styles.error}>{error.message}</p>}
          <Link href="/cadastro">Ainda não possui conta?</Link>
        </form>
      </LoginCard>
    </div>
  )
}
