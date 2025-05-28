import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";

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

        return <LoadingOverlay isLoading={true} message={"Please wait while loading."} />

    }

    return children;
};

export default ProtectedRoute;
