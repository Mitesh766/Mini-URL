import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(store => store.user.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        
        if (!isLoggedIn) {
          navigate("/login", { replace: true });
        }
      }, 1500);

      return () => clearTimeout(timer); 
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    
    return null;
  }

  return children;
};

export default ProtectedRoute;
