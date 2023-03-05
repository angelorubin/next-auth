import Link from 'next/link'

import Button from '../src/components/button/button'
import Input from '../src/components/input/input'


import styles from '../styles/Login.module.css'

import LoginCard from '../src/components/loginCard/loginCard'

export default function CadastroPage() {
    return (
      <div className={styles.background}>
        <LoginCard title="Crie sua conta">
          <form className={styles.form}>
            <Input type="text" placeholder="Seu nome" required />
            <Input type="email" placeholder="Seu e-mail" required />
            <Input type="password" placeholder="Sua senha" required />
            <Button>Cadastrar</Button>
            <Link href="/login">Já possui conta?</Link>
          </form>
        </LoginCard>
      </div>
    )    
  }  
