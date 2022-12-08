import { Routes, Route } from "react-router-dom";

import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";

const Pages = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<Login />} />
        </Routes>
    );
};

export default Pages;
