import { Button, TextField } from '@muneo/design-system';
import { useLoginForm } from '../hooks/useLoginForm';
import * as styles from '../Login.css';

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, fieldErrors, submitError, isPending, submit } = useLoginForm();

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      noValidate
    >
      <TextField
        id="email"
        type="email"
        label="이메일"
        placeholder="admin@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
        autoComplete="email"
      />
      <TextField
        id="password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        autoComplete="current-password"
      />

      {submitError && <div className={styles.errorBox}>{submitError}</div>}

      <Button type="submit" variant="primary" size="md" disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
};
