import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, projectFirestore } from "../firebase/config";

function useCollection(neededCollection) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = collection(db, neededCollection);

    let unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (e) => {
        console.log(e); // Log the actual error object
        setError("Could not fetch the data");
      }
    );

    return () => {
      unsub();
    };
  }, [neededCollection]);

  return { documents, error };
}

export default useCollection;
