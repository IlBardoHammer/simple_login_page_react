import {Navigate, Outlet} from "react-router-dom";

export function PrivateRoute({ isAuthenticated  }) {
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
}