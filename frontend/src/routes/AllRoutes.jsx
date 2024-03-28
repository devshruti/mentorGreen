import { Route, Routes } from "react-router-dom";
import SignUpForm from "../pages/Signup";
import SignInForm from "../pages/Signin";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import TaskPage from "../pages/Task";
import { PrivateRoute } from "./Privateroute";
export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/task" element={<PrivateRoute><TaskPage /></PrivateRoute>} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}