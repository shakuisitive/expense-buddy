import { useState, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";

function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  let transactionInputRef = useRef(null);
  let { addDocument, response } = useFirestore("transactions");

  let handleSubmit = (e) => {
    e.preventDefault();

    addDocument({ name, amount, uid }, { setName, setAmount });
    transactionInputRef.current.focus();
  };
  return (
    <>
      <h3>Add a transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            ref={transactionInputRef}
          />
        </label>

        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
}

export default TransactionForm;
