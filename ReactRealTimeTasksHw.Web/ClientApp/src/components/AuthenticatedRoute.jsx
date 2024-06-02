import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AuthenticatedRoute = ({ children }) => {
    const { user } = useAuth();

    return user ? children : <Navigate to='/login' replace />;
}

export default AuthenticatedRoute;