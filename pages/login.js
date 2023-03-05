import Link from 'next/link'

import Button from '../src/components/button/button'
import Input from '../src/components/input/input'

import styles from '../styles/Login.module.css'

import LoginCard from '../src/components/loginCard/loginCard'

export default function LoginPage() {
  return (
    <div className={styles.background}>
      <LoginCard title="Entre em sua conta">
        <form className={styles.form}>
          <Input type="email" placeholder="Seu e-mail" required />
          <Input type="password" placeholder="Sua senha" required />
          <Button>Entrar</Button>
	      <Link href="/cadastro">Ainda não possui conta?</Link>
        </form>
      </LoginCard>
    </div>
  )    
}  
