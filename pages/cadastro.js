import { useState } from 'react'
import Link from 'next/link'

import Button from '../src/components/button/button'
import Input from '../src/components/input/input'


import styles from '../styles/Login.module.css'

import LoginCard from '../src/components/loginCard/loginCard'

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })  

  const handleFormEdit = (event, name) => {
    setFormData({...formData, [name]: event.target.value})
  }

  const handleForm = (event) => {
    event.preventDefault()
    console.log(formData)
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Crie sua conta">
        <form onSubmit={handleForm} className={styles.form}>
          <Input type="text" placeholder="Seu nome" required value={formData.name} onChange={(e) => {handleFormEdit(e, 'name')}} />
          <Input type="email" placeholder="Seu e-mail" required value={formData.email}  onChange={(e) => {handleFormEdit(e, 'email')}} />
          <Input type="password" placeholder="Sua senha" required value={formData.password} onChange={(e) => {handleFormEdit(e, 'password')}} />
          <Button>Cadastrar</Button>
          <Link href="/login">Já possui conta?</Link>
        </form>
      </LoginCard>
    </div>
  )    
}  
