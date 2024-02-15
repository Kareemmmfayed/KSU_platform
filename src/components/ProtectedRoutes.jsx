import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [navigate, isLoggedIn]);

  return <div>{children}</div>;
}

export default ProtectedRoutes;
