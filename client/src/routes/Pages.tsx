import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { Login, SignUp, Home } from "../components";

import PrivateRoutes from "./PrivateRoutes";

const Pages: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<Login />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
};

export default Pages;
