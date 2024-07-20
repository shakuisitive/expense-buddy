import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";
export default function Navbar() {
  let { logout } = useLogout();
  let { user } = useAuthContext();
  console.log(user);
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to={"/"}>expenseBuddy</Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to={"signup"}>Signup</Link>
            </li>
            <li>
              <Link to={"login"}>Login</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>Hello, {user.displayName}</li>
            <li>
              <button onClick={() => logout()} className="btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
