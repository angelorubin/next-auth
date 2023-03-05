import styles from '../styles/Login.module.css'

import LoginCard from '../src/components/loginCard/loginCard'

export default function LoginPage() {
  return (
    <div className={styles.background}>
      <LoginCard />
    </div>
  )    
}  
