import { useEffect, useState } from "react";
import useLogin from "../../hooks/useLogin";

import styles from "./Login.module.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { login, error, isPending } = useLogin();

  let handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input onChange={(e) => setEmail(e.target.value)} type="email" />
      </label>

      <label>
        <span>Password:</span>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
      </label>

      {isPending ? (
        <button disabled className="btn">
          Logging in...
        </button>
      ) : (
        <button className="btn">Login</button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
