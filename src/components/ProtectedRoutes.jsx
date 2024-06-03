import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useEffect } from "react";

function ProtectedRoutes({ children, role }) {
  const { isLoggedIn, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "all" || (userType === "student" && role === "applicant")) {
      if (!isLoggedIn) navigate("/login");
    } else if (!isLoggedIn || role != userType) navigate("/login");
  }, [navigate, isLoggedIn, role, userType]);

  return <div>{children}</div>;
}

export default ProtectedRoutes;
