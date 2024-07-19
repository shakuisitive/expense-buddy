import { useEffect, createContext, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export let AuthContext = createContext();

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, authIsReady: true, user: action.payload };
    default:
      return state;
  }
}

export let AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  console.log("current state", state.user);
  useEffect(() => {
    let unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
