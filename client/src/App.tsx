import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import UrlComponents from "./components/UrlComponents";
import AuthForm from "./components/authForm,";

const App = () => {
  const { user } = useAuth();

  return (
    <div className="text-2xl">
      <Routes>
        <Route
          path="/allUrl"
          element={user ? <UrlComponents /> : <Navigate to="/" />}
        />
        <Route path="/" element={<AuthForm />} />
      </Routes>
    </div>
  );
};

export default App;
