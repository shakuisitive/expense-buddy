import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import useAuthContext from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function useLogin() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  let { dispatch } = useAuthContext();

  let login = async (email, password) => {
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
      const res = await signInWithEmailAndPassword(
        projectAuth,
        email,
        password
      );
      console.log(res);
      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (e) {
      if (!isCancelled) {
        console.log(e.message);
        setError(e.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
}
