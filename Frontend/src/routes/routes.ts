import { lazy } from 'react';
const Login = lazy(()=> import("../core/public/login/login"))

const Dasboard = lazy(() => import("../core/protected/Dashboard/dashboard"))
// const Dasboard = lazy(() => import("../core/protected/dashboard"))
const Signup = lazy(() => import("../core/public/signup/signup"))

const appRoutes: CustomRoute[] = [
    {
        path: "/login",
        component: Login,
        type: "login"
    },
    {
        path: "/home",
        component: Dasboard,
        type: "authorized",
    },
    {
        path: "/signup",
        component: Signup,
        type: "signup",
    },
]

export default appRoutes
