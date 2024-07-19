import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuthContext() {
  let context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth Context must be used within suitable children.");
  }
  return context;
}

export default useAuthContext;
