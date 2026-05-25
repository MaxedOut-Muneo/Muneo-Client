import { LoginForm } from './components/LoginForm';
import * as styles from './Login.css';

export const Login = () => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <div>
        <h1 className={styles.title}>문어 Admin</h1>
        <p className={styles.subtitle}>관리자 계정으로 로그인하세요.</p>
      </div>
      <LoginForm />
    </div>
  </div>
);
