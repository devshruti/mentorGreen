import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {


    let email = localStorage.getItem("email")
    console.log("PR", email)
    if (email) {
        return children
    }
    alert("First Login Please !!")
    return <Navigate to="/login" />
}