import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState, useReducer, useEffect } from "react";
import {
  db,
  firebaseConfig,
  projectFirestore,
  timestamp,
} from "../firebase/config";
import { initializeApp } from "firebase/app";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

let fireStoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export function useFirestore(collectionToAddTo) {
  let [response, dispatch] = useReducer(fireStoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // init firebase
  initializeApp(firebaseConfig);

  // init services
  const db = getFirestore();

  // collection ref
  const ref = collection(db, collectionToAddTo);

  // only dispatch if not cancelled
  let dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  let addDocument = async (doc, ...rest) => {
    let { setName, setAmount } = rest[0];
    setName("");
    setAmount("");
    dispatch({ type: "IS_PENDING" });
    try {
      // let createdAt = timestamp.fromDate(new Date());
      let addedDocument = await addDoc(ref, {
        ...doc,
        createdAt: serverTimestamp(),
      });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (e) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: e.message,
      });
    }
  };

  // delete a document
  let deleteDocument = async (id) => {};

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    response,
  };
}
