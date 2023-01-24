import { FC, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { LoginPage } from "../login";
import { RegisterPage } from "../register";

import PrivateRoutes from "./private-routes";

const LazyHomePage = lazy(() => import("../home"));

export const Pages: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<LazyHomePage />} />
            </Route>
        </Routes>
    );
};
