import { Outlet, Navigate } from "react-router-dom";
// import LoginForm from "../pages/auth/Login/Loginform";

function useAuth() {
    let user = { LoggedIn: false };

    let userStorage = localStorage.getItem("user");
    let parsedUser = JSON.parse(userStorage);
    // console.log(JSON.parse(userStorage));

    // console.log(parsedUser.token)

    if(parsedUser === null) {
       user.LoggedIn = false;
    } else if(parsedUser.token){
        user.LoggedIn = true;
    }

    return user && user.LoggedIn;
};

function ProtectedRoutes() {
    let isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={"/auth/login"}/>;
}

export default ProtectedRoutes;