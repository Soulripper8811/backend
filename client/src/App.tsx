import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";

const App = () => {
  const { authUser, checkAuth, checkingAuth } = useAuthStore();
  console.log(authUser);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="mx-auto  px-11 py-10 w-full ">
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LogInPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
