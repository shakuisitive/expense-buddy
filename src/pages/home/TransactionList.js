import styles from "./Home.module.css";
import useAuthContext from "../../hooks/useAuthContext";
import { db } from "../../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

function TransactionList({ transactions }) {
  let { user: currentlyLoggedInUser } = useAuthContext();

  let transactionsOfLoggedInUser = transactions.filter(
    (transaction) => transaction.uid === currentlyLoggedInUser.uid
  );

  // Defensive checks before sorting
  transactionsOfLoggedInUser = transactionsOfLoggedInUser.filter(
    (transaction) =>
      transaction.createdAt && typeof transaction.createdAt.seconds === "number"
  );

  transactionsOfLoggedInUser.sort(
    (a, b) => b.createdAt.seconds - a.createdAt.seconds
  );

  let handleOnDelete = (idOfTransactionToDelete) => {
    let docRef = doc(db, "transactions", idOfTransactionToDelete);
    deleteDoc(docRef);
  };

  return (
    <ul className={styles.transactions}>
      {transactionsOfLoggedInUser.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button
            onClick={() => {
              handleOnDelete(transaction.id);
            }}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
