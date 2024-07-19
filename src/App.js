import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// components
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
// custom hooks
import useAuthContext from "./hooks/useAuthContext";
// for experimentatiion
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
// delete for experimentation

function App() {
  let { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />

            <Route
              path="login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
