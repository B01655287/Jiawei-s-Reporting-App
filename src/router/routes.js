import { lazy } from "react"
const Home = lazy(() => import('../pages/Home'));
const Detail = lazy(() => import('../pages/Detail'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const Routes = [
    {
        path: "/",
        element: Home,
    },
    {
        path: "/detail",
        element: Detail,
    },
    {
        path: "/login",
        element: Login,
    },
    {
        path: "/register",
        element: Register,
    }
]

export default Routes;