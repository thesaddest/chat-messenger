import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../shared/lib/hooks/use-auth";

const PrivateRoutes: FC = () => {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
