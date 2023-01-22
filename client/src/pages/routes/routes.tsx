import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { LoginPage } from "../login";
import { RegisterPage } from "../register";
import { HomePage } from "../home";

import PrivateRoutes from "./private-routes";

const Pages: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    );
};

export default Pages;
