import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import useSignup from "../../hooks/useSignup";
import styles from "./Signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  let { error, isPending, signup } = useSignup();

  let handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Signup</h2>
      <label>
        <span>Email:</span>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>
        <span>Password:</span>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>

      <label>
        <span>Display name:</span>
        <input type="text" onChange={(e) => setDisplayName(e.target.value)} />
      </label>

      {!isPending && <button className="btn">Signup</button>}
      {isPending && (
        <button disabled className="btn">
          Loading...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
