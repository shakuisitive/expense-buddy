import styles from "./Home.module.css";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";

function Home() {
  let { user } = useAuthContext();
  let { documents, error } = useCollection("transactions");
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}

export default Home;
