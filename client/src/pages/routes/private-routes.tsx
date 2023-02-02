import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../entities/user/hooks";

const PrivateRoutes: FC = () => {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
